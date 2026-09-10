'use client'

import { createColumnHelper } from '@tanstack/react-table'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { useSearchParams } from 'react-router'

import { useGetTransactions } from '@/api/hooks/transaction'
import { formatCurrency } from '@/helpers/currency'

import TransactionTypeBadge from './transaction-type-badge'
import { DataTable } from './ui/data-table'

const columnHelper = createColumnHelper()

export const columns = columnHelper.columns([
  columnHelper.accessor('name', {
    header: 'Titulo',
  }),
  columnHelper.accessor('type', {
    header: 'Tipo',
    cell: ({ row: { original: transaction } }) => {
      return <TransactionTypeBadge variant={transaction.type.toLowerCase()} />
    },
  }),
  columnHelper.accessor('date', {
    header: 'Data',
    cell: ({ row: { original: transaction } }) => {
      return format(new Date(transaction.date), "dd 'de' MMMM yyyy", {
        locale: ptBR,
      })
    },
  }),
  columnHelper.accessor('amount', {
    header: 'Valor',
    cell: ({ row: { original: transaction } }) => {
      return formatCurrency(transaction.amount)
    },
  }),
  columnHelper.accessor('actions', {
    header: 'Ações',
  }),
])

const TransactionsTable = () => {
  const [searchParams] = useSearchParams()
  const from = searchParams.get('from')
  const to = searchParams.get('to')
  const { data: transactions } = useGetTransactions({ from, to })

  if (!transactions) return null
  return <DataTable columns={columns} data={transactions} />
}

export default TransactionsTable
