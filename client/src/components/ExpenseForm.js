import { MAX_DECIMALS } from "../lib/currency";

function InputFloat(props) {
  return (
    <div className="relative">
      <label
        htmlFor={props.for}
        style={{ zIndex: "-1" }}
        className={`transition-all absolute left-0 top-1/2 transform -translate-y-1/2 text-gray-500 ${
          props.active ? "-top-1/4 text-xs text-black" : ""
        }`}
      >
        {props.description}
      </label>
      {props.children}
    </div>
  );
}

export default function ExpenseForm(props) {
  const handleBlur = ({ target }) => {
    if (!target.value) return;
    target.value = parseFloat(target.value).toFixed(MAX_DECIMALS);
  };

  return (
    <form
      className="w-full flex justify-between items-center"
      onSubmit={props.onSubmit}
    >
      <InputFloat
        for="description"
        description="Beskrivning"
        active={props.description.length > 0}
      >
        <input
          className="transition-colors bg-transparent border-b-2 border-gray-600 hover:border-yellow-500 focus:border-yellow-500 focus:outline-none"
          type="text"
          id="description"
          value={props.description}
          onChange={props.onDescriptionChange}
          maxLength="140"
        />
      </InputFloat>
      <InputFloat
        for="amount"
        description="Belopp"
        active={props.amount.length > 0}
      >
        <input
          className="transition-colors bg-transparent border-b-2 border-gray-600 hover:border-yellow-500 focus:border-yellow-500 focus:outline-none"
          type="number"
          id="amount"
          value={props.amount}
          onChange={props.onAmountChange}
          onBlur={handleBlur}
          min="0"
          max="99999999999"
          step="0.01"
          required
        />
      </InputFloat>
      <button className="py-2 px-4 bg-yellow-500 text-white rounded-lg active:shadow-inner">
        Lägg till
      </button>
    </form>
  );
}
