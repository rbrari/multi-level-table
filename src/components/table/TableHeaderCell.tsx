import { SortingIndicator } from '@/components/SortingIndicator'
import { Button } from '@/components/ui/button'
import { flexRender, type useReactTable } from '@tanstack/react-table'

interface TableHeaderCellProps<TData> {
  header: ReturnType<
    ReturnType<typeof useReactTable<TData>>['getHeaderGroups']
  >[number]['headers'][number]
}

export function TableHeaderCell<TData>({ header }: Readonly<TableHeaderCellProps<TData>>) {
  if (header.isPlaceholder) return null

  const canSort = header.column.getCanSort()
  const headerContent = flexRender(header.column.columnDef.header, header.getContext())

  if (canSort) {
    return (
      <Button
        className="flex w-full items-center justify-start !p-0"
        variant="link"
        onClick={header.column.getToggleSortingHandler()}
      >
        {headerContent}
        <SortingIndicator isSorted={header.column.getIsSorted()} />
      </Button>
    )
  }

  return <div className="flex w-full items-center text-left">{headerContent}</div>
}
