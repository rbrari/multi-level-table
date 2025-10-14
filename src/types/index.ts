export interface DataItem {
  label: string
  loan_number: number
  remaining_amount: number
  realized_amount: number
  payment_delay: number
  asset_amount: number | null
}

export interface Platform {
  root: DataItem
  children: DataItem[] | null
}

export interface Portfolio {
  root: DataItem
  children: Platform[]
}

export interface TableNode {
  primary: string
  children: Portfolio[]
}

export type TableData = TableNode[]
