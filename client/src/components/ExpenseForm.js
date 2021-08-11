import { decToFloat } from "../lib/currency";

function InputFloat(props) {
  return (
    <div className="relative mt-6 w-full sm:auto">
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
  const decimalRegEx = /^\d{0,11}[.|,]?\d{0,2}$/;

  const handleBlur = ({ target }) => {
    if (!target.value) return;
    target.value = decToFloat(target.value);
  };

  // This semi-hacky function is required due to
  // validation/conversion issues stemming from the fact that
  // different locales recognize different decimal characters
  // as valid, and there's no way to force consistency.
  const handleInput = event => {
    const newChar = event.data.toString();
    const value = event.target.value + newChar;
    if (!decimalRegEx.test(value)) {
      event.preventDefault();
    }
  };

  return (
    <form
      className="w-full max-w-xs sm:max-w-full mx-auto flex flex-col sm:flex-row justify-center sm:justify-between items-center"
      onSubmit={props.onSubmit}
    >
      <InputFloat
        for="description"
        description="Beskrivning"
        active={props.description.length > 0}
      >
        <input
          className="w-full sm:w-auto transition-colors bg-transparent border-b-2 border-gray-600 hover:border-yellow-500 focus:border-yellow-500 focus:outline-none"
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
          className="w-full sm:w-auto transition-colors bg-transparent border-b-2 border-gray-600 hover:border-yellow-500 focus:border-yellow-500 focus:outline-none"
          type="text"
          id="amount"
          value={props.amount}
          onChange={props.onAmountChange}
          onBlur={handleBlur}
          // NOTICE: beforeInput has relatively poor browser support
          onBeforeInput={handleInput}
          maxLength="14"
          // eslint-disable-next-line no-magic-numbers
          pattern={decimalRegEx.toString().slice(1, -1)}
          inputMode="decimal"
          required
        />
      </InputFloat>
      <button className="transition-colors py-2 px-4 mt-6 focus:bg-yellow-500 focus:text-white hover:bg-yellow-500 hover:text-white border-2 border-yellow-500 text-yellow-500 font-semibold rounded-lg whitespace-nowrap">
        Lägg till
      </button>
    </form>
  );
}
