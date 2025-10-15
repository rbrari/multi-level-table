import { ChevronToggle } from '@/components/ChevronToggle'
import { type TableRow } from '@/components/table'
import { cn } from '@/lib/utils'
import type { Row } from '@tanstack/react-table'

interface TableTreeCellProps<TData extends { label: string }> {
  row: Row<TableRow<TData>>
}

export function TableTreeCell<TData extends { label: string }>({
  row,
}: Readonly<TableTreeCellProps<TData>>) {
  const {
    original: {
      depth: indent,
      data: { label },
    },
    getCanExpand,
    getIsExpanded,
    getToggleExpandedHandler,
  } = row

  const canExpand = getCanExpand()
  const isExpanded = getIsExpanded()

  return (
    <div
      className={`flex cursor-pointer items-center space-x-1 font-medium pl-${indent * 8}`}
      onClick={getToggleExpandedHandler()}
    >
      {canExpand && (
        <div className="rounded-md p-2 hover:bg-accent hover:text-accent-foreground">
          <ChevronToggle isExpanded={isExpanded} />
        </div>
      )}
      <span className={cn('truncate', { 'ml-8': !canExpand })} title={label}>
        {label}
      </span>
    </div>
  )
}
