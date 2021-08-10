import { formatCurrency } from "../lib/currency";
const COLUMNS = ["Beskrivning", "Utgift"];

export default function ExpenseTable(props) {
  return (
    <table
      className="border-collapse w-full rounded-2xl"
      aria-labelledby="table-title"
    >
      <thead className="bg-blue-800 text-white">
        <tr>
          {COLUMNS.map((col, index) => (
            <th
              className={`text-left text-lg py-2 ${index === 0 ? "pl-4" : ""}`}
              key={col}
              scope="col"
            >
              {col}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="py-4 bg-gray-50">
        {props.rows.map((expense, index) => (
          <tr
            className={
              index !== props.rows.length - 1 ? "border-b border-gray-300" : ""
            }
            key={index}
          >
            <th
              className={`w-full text-left font-light text-black px-4 ${
                !expense.description ? "text-opacity-60 italic" : ""
              } `}
              role="cell"
              scope="row"
            >
              {expense.description || "Allmän utgift"}
            </th>
            <td className="pr-4 py-2">{formatCurrency(expense.amount)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
