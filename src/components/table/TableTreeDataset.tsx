import { ChevronToggle } from '@/components/ChevronToggle'
import { TableActions, TableTreeCell, TableVirtualized, type TableRow } from '@/components/table'
import { Button } from '@/components/ui/button'
import { useTreeExpansion } from '@/hooks/useTreeExpansion'
import { getPrimaryFieldLabel, type DataItem } from '@/services/api/stealth'
import type { ColumnDef } from '@tanstack/react-table'
import { useMemo } from 'react'

interface TableTreeDatasetProps {
  primary: string
  tableRows: TableRow<DataItem>[]
  tableColumns: ColumnDef<TableRow<DataItem>>[]
}

export function TableTreeDataset({
  primary,
  tableRows,
  tableColumns,
}: Readonly<TableTreeDatasetProps>) {
  const columnHeader = getPrimaryFieldLabel(primary)

  const { expanded, setExpanded, handleExpandAll, handleCollapseAll, collapsed, setCollapsed } =
    useTreeExpansion({
      tableRows,
    })

  const handleToggleCollapse = () => setCollapsed((state) => !state)

  const columns: ColumnDef<TableRow<DataItem>>[] = useMemo(
    () => [
      {
        accessorFn: (row) => row.data.label,
        header: columnHeader,
        enableSorting: false,
        cell: ({ row }) => <TableTreeCell row={row} />,
        size: 500,
        meta: {
          isPinned: true,
        },
      },
      ...tableColumns,
    ],
    [columnHeader, tableColumns],
  )

  return (
    <div className="w-full overflow-hidden rounded-lg border bg-card">
      <div className="flex items-center justify-between gap-4 bg-muted/30 px-4 py-3">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleToggleCollapse}
            title={collapsed ? 'Expand section' : 'Collapse section'}
          >
            <ChevronToggle isExpanded={!collapsed} />
          </Button>
          <h2 className="text-lg font-semibold">{columnHeader}</h2>
        </div>
        <TableActions onExpandAll={handleExpandAll} onCollapseAll={handleCollapseAll} />
      </div>
      {!collapsed && (
        <div className="p-4">
          <TableVirtualized
            columns={columns}
            data={tableRows}
            height="392px"
            expanded={expanded}
            onExpandedChange={setExpanded}
          />
        </div>
      )}
    </div>
  )
}
