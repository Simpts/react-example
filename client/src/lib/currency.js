export const MAX_DECIMALS = 2;

export function formatCurrency(amount) {
  // Leaving the first argument undefined defaults to user locale
  const formatter = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "SEK",
    minimumFractionDigits: MAX_DECIMALS,
  });

  return formatter.format(amount);
}

/**
 * Utility function to convert a variable to a float.
 */
export function decToFloat(dec) {
  if (typeof dec != "string") dec = dec.toString();
  return parseFloat(dec.replace(",", ".")).toFixed(MAX_DECIMALS);
}

/**
 * Safely sums floating point values by multiplying
 * them into integers before adding and then dividing
 * the final result by the multiplication factor.
 */
export function safeSum(amounts) {
  // eslint-disable-next-line no-magic-numbers
  const intFactor = 10 ** MAX_DECIMALS;

  return amounts.reduce((accumulator, value) => {
    return (accumulator * intFactor + value * intFactor) / intFactor;
  });
}
