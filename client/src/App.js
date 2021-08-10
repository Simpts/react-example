import { useState } from "react";
import useSWR, { mutate } from "swr";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Summary from "./components/ExpenseSummary";
import ExpenseTable from "./components/ExpenseTable";
import ExpenseForm from "./components/ExpenseForm";
import { safeSum, MAX_DECIMALS } from "./lib/currency";
const NOTIFICATION_TIMEOUT = 60000;
const API_PATH = "/api/expenses";

function App() {
  const [newDescription, setNewDescription] = useState("");
  const [newAmount, setNewAmount] = useState("");
  const { data, error } = useSWR(API_PATH);
  const rows = data?.data?.rows;

  if (error) {
    console.error(error);
    toast.error("Hoppsan, något verkar ha gått fel! Prova att försöka igen.", {
      // Prevent duplicates
      toastId: "general-error",
    });
  }

  const handleSubmit = event => {
    event.preventDefault();
    const floatAmount = parseFloat(newAmount).toFixed(MAX_DECIMALS);
    const payload = {
      amount: floatAmount,
      description: newDescription,
    };

    // Update UI optimistically without revalidation
    mutate(API_PATH, { data: { rows: [payload, ...rows] } }, false);
    post(API_PATH, payload)
      .then(async response => {
        const data = await response.json();

        if (data.error) {
          console.error(data.error);
          toast.error("Utgiften kunde inte läggas till. Var god försök igen.");
          // Revalidate to roll back changes
          mutate(API_PATH);
        }
      })
      .catch(error => {
        console.error(error);
        toast.error("Utgiften kunde inte läggas till. Var god försök igen.");
        mutate(API_PATH);
      });

    setNewDescription("");
    setNewAmount("");
  };

  const handleDescriptionChange = ({ target }) => {
    const maxCharacters = 140;
    let value = target.value;
    if (value.length > maxCharacters) {
      value = value.substring(0, maxCharacters);
    }

    setNewDescription(value);
  };

  const handleAmountChange = ({ target }) => {
    setNewAmount(target.value);
  };

  return (
    <div className="min-h-screen w-screen max-w-xl mx-auto flex flex-col items-start justify-center px-4 py-8">
      <Summary
        total={
          rows && rows.length > 0
            ? safeSum(rows.map(({ amount }) => amount))
            : 0
        }
      />
      <div className="w-full mt-10 mb-4">
        <h3 id="table-title" className="font-semibold text-xl">
          Senaste utgifterna
        </h3>
        <hr className="my-4" />
        <ExpenseTable rows={rows} />
      </div>
      <ExpenseForm
        amount={newAmount}
        description={newDescription}
        onAmountChange={handleAmountChange}
        onDescriptionChange={handleDescriptionChange}
        onSubmit={handleSubmit}
      />
      <ToastContainer limit={3} />
    </div>
  );
}

/**
 * Simple fetch wrapper for convenient POST-reqs.
 */
function post(endpoint, data) {
  return fetch(endpoint, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

export default App;
