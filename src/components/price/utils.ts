export default function calculatePrice(
  personAmount: number,
  avgPrice: number,
  tick: number
): number {
  const hourlyToTickRatio: number = 1 / 60 / 60;
  return personAmount * avgPrice * hourlyToTickRatio * tick;
}
