import { Button } from '@/components/ui/button'
import { ChevronsDownUp, ChevronsUpDown } from 'lucide-react'

interface TableActionsProps {
  onExpandAll: () => void
  onCollapseAll: () => void
}

export function TableActions({ onExpandAll, onCollapseAll }: Readonly<TableActionsProps>) {
  return (
    <div className="flex gap-2">
      <Button variant="ghost" size="sm" onClick={onExpandAll} className="gap-1.5">
        <ChevronsUpDown className="size-4" />
        <span className="text-xs">Expand All</span>
      </Button>
      <Button variant="ghost" size="sm" onClick={onCollapseAll} className="gap-1.5">
        <ChevronsDownUp className="size-4" />
        <span className="text-xs">Collapse All</span>
      </Button>
    </div>
  )
}
