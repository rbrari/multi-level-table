import type { TableData } from '../types'

export async function fetchTableData(): Promise<TableData[]> {
  const response = await fetch(`/api/data`)
  return response.json()
}
