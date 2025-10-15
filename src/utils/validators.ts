export function isNumber(num: unknown): num is number {
  if (typeof num === 'number' && !isNaN(num)) {
    return true
  }
  if (typeof num === 'string' && num.trim() !== '') {
    const parsed = Number(num)
    return Number.isFinite(parsed)
  }
  return false
}
