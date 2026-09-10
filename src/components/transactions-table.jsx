'use client'

import { createColumnHelper } from '@tanstack/react-table'
import { format, parseISO } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { useSearchParams } from 'react-router'

import { useGetTransactions } from '@/api/hooks/transaction'
import { formatCurrency } from '@/helpers/currency'

import EditTransactionButton from './edit-transaction-button'
import TransactionTypeBadge from './transaction-type-badge'
import { DataTable } from './ui/data-table'
import { ScrollArea } from './ui/scroll-area'

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
      return format(
        parseISO(transaction.date.slice(0, 10)),
        "dd 'de' MMMM yyyy",
        {
          locale: ptBR,
        }
      )
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
    cell: ({ row: { original: transaction } }) => {
      return <EditTransactionButton transaction={transaction} />
    },
  }),
])

const TransactionsTable = () => {
  const [searchParams] = useSearchParams()
  const from = searchParams.get('from')
  const to = searchParams.get('to')
  const { data: transactions } = useGetTransactions({ from, to })

  if (!transactions) return null
  return (
    <>
      <h2 className="text-2xl font-bold">Transações</h2>
      <ScrollArea className="h-125 max-h-125 rounded-md border">
        <DataTable columns={columns} data={transactions} />
      </ScrollArea>
    </>
  )
}

export default TransactionsTable
