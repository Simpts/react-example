import { useState } from "react";
import useSWR, { mutate } from "swr";
import Summary from "./components/ExpenseSummary";
import ExpenseTable from "./components/ExpenseTable";
import ExpenseForm from "./components/ExpenseForm";
import { safeSum, MAX_DECIMALS } from "./lib/currency";
const API_PATH = "http://localhost:8080/api/expenses";

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

function App() {
  const { data, error } = useSWR(API_PATH);
  const [newDescription, setNewDescription] = useState("");
  const [newAmount, setNewAmount] = useState("");

  if (error) {
    // Do some error handling
  }

  const rows = data?.data?.rows;

  const handleSubmit = event => {
    event.preventDefault();
    const floatAmount = parseFloat(newAmount).toFixed(MAX_DECIMALS);
    const payload = {
      amount: floatAmount,
      description: newDescription,
    };

    // Update UI optimistically
    mutate(API_PATH, { data: { rows: [payload, ...rows] } }, false);

    post(API_PATH, payload)
      .then(async response => {
        const data = await response.json();

        if (data.error) {
          // Revalidate to roll back changes
          mutate(API_PATH);
        }
      })
      .catch(error => {
        console.error(error);
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
    <div className="min-h-screen w-screen max-w-xl mx-auto flex flex-col items-start justify-center px-4">
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
    </div>
  );
}

export default App;
