import { isNumber } from './validators'

export function formatCurrency(value: unknown, options: Intl.NumberFormatOptions = {}): string {
  if (!isNumber(value)) return ''
  const CurrencyFormat = new Intl.NumberFormat('en-US', {
    ...options,
    currency: options.currency || 'USD',
    style: 'currency',
  })
  return CurrencyFormat.format(Number(value))
}

export function formatNumber(value: unknown, options: Intl.NumberFormatOptions = {}): string {
  if (!isNumber(value)) return ''
  const MetricFormat = new Intl.NumberFormat('en-US', options)
  return MetricFormat.format(Number(value))
}
