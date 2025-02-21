export const formatPrice = (locale: string, currencyCode: string, amount: number): string => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currencyCode,
    currencyDisplay: 'narrowSymbol'
  }).format(amount)
}

export const currencySymbolToCode: Record<string, string> = {
  '€': 'EUR',
  '£': 'GBP',
  'DKK': 'DKK',
  'CHF': 'CHF',
  '¥': 'JPY',
  '$': 'USD'
} 