import { formatCurrency } from "../lib/currency";

export default function Summary(props) {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4 text-blue-800">
        Totala utgifter:
      </h1>
      <span className="text-4xl font-extralight">
        {formatCurrency(props.total ?? 0)}
      </span>
    </div>
  );
}
