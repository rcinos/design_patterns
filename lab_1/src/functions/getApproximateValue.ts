export function getApproximateValue(value: number): number {
  const approximation = 10 ** 12;
  return Math.round(value * approximation) / approximation;
}
