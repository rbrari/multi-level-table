import { type TableRow } from '@/components/table'
import {
  isEntryWithChildren,
  type Dataset,
  type DatasetChildren,
  type DatasetEntry,
} from '@/services/api/stealth'
import type { ExpandedState } from '@tanstack/react-table'

export function createExpandedState<T>(rows: TableRow<T>[], expanded = true): ExpandedState {
  const allRowIds: ExpandedState = {}

  const collectIds = (items: TableRow<T>[]) => {
    for (const row of items) {
      if (row.subRows.length > 0) {
        allRowIds[row.id] = expanded
        collectIds(row.subRows)
      }
    }
  }

  collectIds(rows)
  return allRowIds
}

export function buildRowFromDataset<T>(
  entry: DatasetChildren<T>[number],
  idPath: string[],
  depth: number,
): TableRow<T> {
  let data: T
  let children: DatasetEntry<T>[] | undefined

  if (isEntryWithChildren(entry)) {
    data = entry.root
    children = entry.children
  } else {
    data = entry
    children = undefined
  }

  const row: TableRow<T> = {
    data,
    id: idPath.join('-'),
    depth,
    subRows: [],
  }

  if (!children?.length) {
    return row
  }

  for (const [index, child] of children?.entries() ?? []) {
    const childRow = buildRowFromDataset(child, [...idPath, index.toString()], depth + 1)
    row.subRows.push(childRow)
  }

  return row
}

export function getTableRowsForDataset<T>(datasets: Dataset<T>[], index: number): TableRow<T>[] {
  if (index < 0 || index >= datasets.length) return []
  return datasets[index].children.map((node, nodeIndex) =>
    buildRowFromDataset(node, [`levels-${nodeIndex}`], 0),
  )
}
