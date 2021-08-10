import CountUp from "react-countup";
import { formatCurrency } from "../lib/currency";

export default function Summary(props) {
  return (
    <div>
      <h1 className="text-3xl font-semibold mb-4 text-blue-800">
        Totala utgifter:
      </h1>
      <span className="text-4xl font-extralight">
        <CountUp
          decimals={2}
          start={0}
          end={props.total || 0}
          duration={2}
          preserveValue={true}
          formattingFn={formatCurrency}
        />
        {/* {formatCurrency(props.total ?? 0)} */}
      </span>
    </div>
  );
}
