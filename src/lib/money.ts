/** Whole-rupee formatting for the fictional prices in the concept demos. */
export function inr(amount: number): string {
  return `₹${amount.toLocaleString("en-IN")}`;
}
