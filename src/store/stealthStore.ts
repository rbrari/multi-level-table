import { type TableRow } from '@/components/table'
import { getTableRowsForDataset } from '@/components/table/utils'
import { fetchTableData, type DataItem, type Dataset } from '@/services/api/stealth'
import { create } from 'zustand'

export interface DatasetView {
  primary: string
  tableRows: TableRow<DataItem>[]
}

interface StealthState {
  loading: boolean
  datasets: Dataset[]
}

interface StealthActions {
  loadData: () => Promise<void>
  reset: () => void
}

type StealthStore = StealthState & StealthActions

const initialState: StealthState = {
  loading: false,
  datasets: [],
}

export const useStealthStore = create<StealthStore>()((set, get) => ({
  ...initialState,

  loadData: async () => {
    const state = get()
    if (state.loading) return

    try {
      set({ loading: true }, false)
      const datasets = await fetchTableData()
      set({ datasets, loading: false }, false)
    } catch (error) {
      console.error(error)
      set({ loading: false }, false)
    }
  },

  reset: () => set({ ...initialState }, false),
}))

export function computeDatasetViews(datasets: Dataset[]): DatasetView[] {
  return datasets.map((dataset, index) => ({
    primary: dataset.primary,
    tableRows: getTableRowsForDataset(datasets, index),
  }))
}
