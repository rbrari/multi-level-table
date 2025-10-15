import type { TableRow } from '@/components/table'
import type { DataItem } from '@/services/api/stealth'
import { formatCurrency, formatNumber } from '@/utils/formatters'
import type { ColumnDef } from '@tanstack/react-table'

export const TABLE_COLUMNS: ColumnDef<TableRow<DataItem>>[] = [
  {
    accessorFn: (row) => row.data.loan_number,
    header: 'Loan #',
    cell: ({ getValue }) =>
      formatNumber(getValue() as number, { notation: 'compact', compactDisplay: 'short' }),
    size: 120,
  },
  {
    accessorFn: (row) => row.data.remaining_amount,
    header: 'Remaining Amount',
    cell: ({ getValue }) =>
      formatCurrency(getValue(), { notation: 'compact', compactDisplay: 'short' }),
    size: 150,
  },
  {
    accessorFn: (row) => row.data.realized_amount,
    header: 'Real. Amount',
    cell: ({ getValue }) =>
      formatCurrency(getValue(), { notation: 'compact', compactDisplay: 'short' }),
    size: 150,
    // Support for multiple pinned columns
    // meta: {
    //   isPinned: true,
    // },
  },
  {
    accessorFn: (row) => row.data.payment_delay,
    header: 'Payment Delay',
    cell: ({ getValue }) =>
      formatNumber(getValue(), { notation: 'compact', compactDisplay: 'short' }),
    size: 120,
  },
  {
    accessorFn: (row) => row.data.asset_amount,
    header: 'Asset Amount',
    cell: ({ getValue }) =>
      formatCurrency(getValue(), { notation: 'compact', compactDisplay: 'short' }),
    size: 150,
  },
]
