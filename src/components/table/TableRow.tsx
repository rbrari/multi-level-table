import { TableCell, TableRow } from '@/components/ui/table'
import { cn } from '@/lib/utils'
import { flexRender, type Row } from '@tanstack/react-table'
import type { HTMLAttributes } from 'react'

export const TableRowComponent = <TData,>(
  rows: Row<TData>[],
  pinnedColumnsOffsets: Map<string, number>,
) =>
  function getTableRow(props: HTMLAttributes<HTMLTableRowElement>) {
    const index = props['data-index' as keyof typeof props]
    const row = rows[index]

    if (!row) return null

    return (
      <TableRow
        key={row.id}
        data-state={row.getIsSelected() && 'selected'}
        {...props}
        className={cn(props.className, 'last-of-type:border-b-0')}
      >
        {row.getVisibleCells().map((cell) => {
          const isPinned = cell.column.columnDef.meta?.isPinned
          const leftOffset = isPinned ? (pinnedColumnsOffsets.get(cell.column.id) ?? 0) : 0
          const columnSize = cell.column.getSize()

          return (
            <TableCell
              key={cell.id}
              className={cn('bg-background', {
                'md:sticky md:shadow-[inset_-2px_0_0_0_rgba(0,0,0,0.1)] dark:md:shadow-[inset_-2px_0_0_0_rgba(255,255,255,0.1)]':
                  isPinned,
              })}
              style={{
                width: columnSize,
                height: '50px',
                minWidth: columnSize,
                maxWidth: columnSize,
                ...(isPinned && { left: `${leftOffset}px` }),
              }}
            >
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </TableCell>
          )
        })}
      </TableRow>
    )
  }
