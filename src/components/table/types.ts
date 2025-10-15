export interface TableRow<T> {
  id: string
  depth: number
  data: T
  subRows: TableRow<T>[]
}
