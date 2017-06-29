export const hourlyToTickRatio: number = 1 / 60 / 60;

export default function calculatePrice(
  personAmount: number,
  avgPrice: number,
  tick: number
): number {
  return personAmount * avgPrice * tick * hourlyToTickRatio;
}

export function formatPrice(price: number, currency: string): string {
  const displayPrice: string = price.toFixed(2);
  return currency === '€'
    ? `${displayPrice.replace('.', ',')} ${currency}`
    : `${currency} ${displayPrice}`;
}
