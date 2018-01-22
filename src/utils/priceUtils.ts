export const hourlyToTickRatio: number = 1 / 60 / 60;

export default function calculatePrice(
  personAmount: number,
  avgPrice: number,
  tick: number
): number {
  return personAmount * avgPrice * tick * hourlyToTickRatio;
}

export function formatPrice(price: number, currency: string): string {
  // Do not try to format an undefined price
  if (price) {
    const separator = currency === '€' ? ' ' : ',';
    const displayPrice: string = toDisplayPrice(price, separator);
    return currency === '€'
      ? `${displayPrice.replace('.', ',')} ${currency}`
      : `${currency} ${displayPrice}`;
  } else {
    return '';
  }
}

export function toDisplayPrice(price: number, separator: string): string {
  const roundedPrice = price.toFixed(2);
  const priceParts = roundedPrice.split('.');
  const integerPart: string = priceParts[0];
  const decimalPart: string = priceParts[1];
  const grouped = separateThousands(integerPart, separator);
  return `${grouped}.${decimalPart}`;
}

export function separateThousands(price: string, separator: string): string {
  return price
    .split('')
    .reverse()
    .map((value, index) => {
      if (index !== 0 && index % 3 === 0) {
        return `${value}${separator}`;
      }
      return value;
    })
    .reverse()
    .join('');
}
