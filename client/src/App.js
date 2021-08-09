import Summary from "./components/ExpenseSummary";
import ExpenseTable from "./components/ExpenseTable";
import ExpenseForm from "./components/ExpenseForm";
import { safeSum } from "./lib/currency";

function App() {
  const fakeData = [
    {
      amount: 299.99,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    { amount: 25, description: "Lo" },
    { amount: 42.5, description: "" },
    { amount: 239657.5 },
  ];

  return (
    <div className="min-h-screen w-screen max-w-xl mx-auto flex flex-col items-start justify-center px-4">
      <Summary total={safeSum(fakeData.map(({ amount }) => amount))} />
      <div className="w-full my-10">
        <h3 id="table-title" className="font-semibold text-xl">
          Senaste utgifterna
        </h3>
        <hr className="my-4" />
        <ExpenseTable rows={fakeData} />
      </div>
      <ExpenseForm />
    </div>
  );
}

export default App;
