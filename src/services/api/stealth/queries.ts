import type { Dataset } from './types'

export async function fetchTableData(): Promise<Dataset[]> {
  const response = await fetch(`/api/data`)
  return response.json()
}
