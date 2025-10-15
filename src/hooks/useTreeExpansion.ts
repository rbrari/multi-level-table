import { type TableRow, createExpandedState } from '@/components/table'
import type { ExpandedState } from '@tanstack/react-table'
import { useCallback, useState } from 'react'

interface UseTreeExpansionOptions<TData> {
  tableRows: TableRow<TData>[]
  initialExpanded?: ExpandedState
}

interface UseTreeExpansionReturn {
  collapsed: boolean
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>
  expanded: ExpandedState
  setExpanded: React.Dispatch<React.SetStateAction<ExpandedState>>
  handleExpandAll: () => void
  handleCollapseAll: () => void
}

export function useTreeExpansion<TData>({
  tableRows,
  initialExpanded = {},
}: UseTreeExpansionOptions<TData>): UseTreeExpansionReturn {
  const [collapsed, setCollapsed] = useState(false)

  const [expanded, setExpanded] = useState<ExpandedState>(initialExpanded)

  const handleExpandAll = useCallback(() => {
    setCollapsed(false)
    setExpanded(createExpandedState(tableRows))
  }, [tableRows])

  const handleCollapseAll = useCallback(() => {
    setExpanded({})
  }, [])

  return {
    collapsed,
    setCollapsed,
    expanded,
    setExpanded,
    handleExpandAll,
    handleCollapseAll,
  }
}
