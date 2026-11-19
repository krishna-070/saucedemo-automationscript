/**
 * Converts a product name into the suffix the app uses in its `data-test` ids,
 * e.g. "Sauce Labs Backpack" -> "sauce-labs-backpack".
 */
export function toDataTestId(name: string): string {
  return name.toLowerCase().replace(/\s+/g, '-');
}

/** Parses a displayed price such as "$29.99" or "Total: $32.39" into a number. */
export function parsePrice(text: string): number {
  const match = text.match(/\$(\d+(?:\.\d+)?)/);
  if (!match) throw new Error(`No price found in "${text}"`);
  return Number(match[1]);
}
