export interface DataItem {
  label: string
  loan_number: number
  remaining_amount: number
  realized_amount: number
  payment_delay: number
  asset_amount: number | null
}

export interface DatasetEntry<T> {
  root: T
  children: DatasetEntry<T>[]
}

export type DatasetChildren<T> = DatasetEntry<T>[] | T[]

export interface Dataset<T = DataItem> {
  primary: string
  children: DatasetChildren<T>
}
