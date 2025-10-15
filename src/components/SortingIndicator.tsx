import type { SortDirection } from '@tanstack/react-table'
import { ArrowDown, ArrowUp } from 'lucide-react'

export function SortingIndicator({ isSorted }: Readonly<{ isSorted: SortDirection | false }>) {
  if (!isSorted) return null

  const Icon = isSorted === 'asc' ? ArrowUp : ArrowDown
  return <Icon className="size-4" />
}
