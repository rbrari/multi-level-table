import { TableHeaderCell } from '@/components/table/TableHeaderCell'
import { TableRowComponent } from '@/components/table/TableRow'
import { TableHead, TableRow } from '@/components/ui/table'
import { useControlledState } from '@/hooks/useControlledState'
import { cn } from '@/lib/utils'
import {
  type ColumnDef,
  type ExpandedState,
  type SortingState,
  getCoreRowModel,
  getExpandedRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { forwardRef, useMemo, useState } from 'react'
import { TableVirtuoso } from 'react-virtuoso'

const TableComponent = forwardRef<HTMLTableElement, React.HTMLAttributes<HTMLTableElement>>(
  ({ className, ...props }, ref) => (
    <table
      ref={ref}
      className={cn('w-full caption-bottom text-sm [&>thead]:!z-[100]', className)}
      {...props}
    />
  ),
)

interface TableVirtualizedProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  height: string
  onExpandedChange?: (expanded: ExpandedState) => void
  expanded?: ExpandedState
}

export function TableVirtualized<TData, TValue>({
  columns,
  data,
  height,
  onExpandedChange,
  expanded: controlledExpanded,
}: Readonly<TableVirtualizedProps<TData, TValue>>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [currentExpanded, setExpanded] = useControlledState(
    controlledExpanded,
    onExpandedChange,
    {},
  )

  const sortedColumns = useMemo(
    () =>
      [...columns].sort((first, second) => {
        const firstIsPinned = first.meta?.isPinned ?? false
        const secondIsPinned = second.meta?.isPinned ?? false
        if (firstIsPinned === secondIsPinned) return 0
        return firstIsPinned ? -1 : 1
      }),
    [columns],
  )

  const table = useReactTable({
    data,
    columns: sortedColumns,
    state: {
      sorting,
      expanded: currentExpanded,
    },
    onSortingChange: setSorting,
    onExpandedChange: setExpanded,
    getRowId: (row) => (row as { id?: string })?.id ?? '',
    getSubRows: (row) => (row as { subRows?: TData[] })?.subRows,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
  })

  const { rows } = table.getRowModel()

  const pinnedColumnsOffsets = useMemo(() => {
    const offsets = new Map<string, number>()
    let cumulativeOffset = 0

    const [headerGroup] = table.getHeaderGroups()

    if (headerGroup) {
      for (const header of headerGroup.headers) {
        const isPinned = header.column.columnDef.meta?.isPinned

        if (isPinned) {
          offsets.set(header.column.id, cumulativeOffset)
          cumulativeOffset += header.getSize()
        }
      }
    }

    return offsets
  }, [table])

  return (
    <TableVirtuoso
      className="rounded-md border"
      style={{ height }}
      totalCount={rows.length}
      components={{
        Table: TableComponent,
        TableRow: TableRowComponent(rows, pinnedColumnsOffsets),
      }}
      fixedHeaderContent={() =>
        table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              const isPinned = header.column.columnDef.meta?.isPinned
              const leftOffset = isPinned ? (pinnedColumnsOffsets.get(header.column.id) ?? 0) : 0

              return (
                <TableHead
                  key={header.id}
                  colSpan={header.colSpan}
                  className={cn('bg-accent', {
                    'md:sticky md:top-0 md:shadow-[inset_-2px_0_0_0_rgba(0,0,0,0.1)] dark:md:shadow-[inset_-2px_0_0_0_rgba(255,255,255,0.1)]':
                      isPinned,
                  })}
                  style={{
                    width: header.getSize(),
                    minWidth: header.getSize(),
                    maxWidth: header.getSize(),
                    left: isPinned ? `${leftOffset}px` : undefined,
                  }}
                >
                  <TableHeaderCell header={header} />
                </TableHead>
              )
            })}
          </TableRow>
        ))
      }
    />
  )
}
