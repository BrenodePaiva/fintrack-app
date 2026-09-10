import queryString from 'query-string'

import { protectedApi } from '@/lib/axios'

export const TransactionService = {
  /**
   * Cria uma transação para o usuário autenticado.
   * @param {Object} input
   * @param {string} input.name
   * @param {string} input.date (YYYY-MM-DD)
   * @param {string} input.amount
   * @param {string} input.type (EARNING/EXPENSE/INVESTMENT)
   * @returns {Object} Trasação criada.
   */
  create: async (input) => {
    const response = await protectedApi.post('/transactions/me', {
      name: input.name,
      date: input.date,
      amount: input.amount,
      type: input.type,
    })
    return response.data
  },

  /**
   * Retornas as transações do usuário autenticado.
   * @param {Object} input
   * @param {Object} input.from - Data inicial
   * @param {Object} input.to - Data Final
   */
  getAll: async (input) => {
    const query = queryString.stringify({ from: input.from, to: input.to })
    const response = await protectedApi.get(`/transactions/me?${query}`)
    return response.data
  },

  /**
   * Atualiza uma transação  do usuário autenticado.
   * @param {Object} input
   * @param {string} input.id
   * @param {string} input.name
   * @param {string} input.date (YYYY-MM-DD)
   * @param {string} input.amount
   * @param {string} input.type (EARNING/EXPENSE/INVESTMENT)
   * @returns {Object} Trasação atualizada.
   */
  update: async (input) => {
    const response = await protectedApi.post(`/transactions/me/${input.id}`, {
      name: input.name,
      date: input.date,
      amount: input.amount,
      type: input.type,
    })
    return response.data
  },
}
