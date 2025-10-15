import type { DatasetChildren, DatasetEntry } from './types'

const PRIMARY_FIELD_MAP: Record<string, string> = {
  portfolio_name: 'Portfolio',
  country_name: 'Country',
  standard_rating_label: 'Standard Rating',
}

export function getPrimaryFieldLabel(key: string): string {
  return PRIMARY_FIELD_MAP[key] ?? key
}

export function isEntryWithChildren<T>(node: DatasetChildren<T>[number]): node is DatasetEntry<T> {
  return typeof node === 'object' && node !== null && ('root' in node || 'children' in node)
}
