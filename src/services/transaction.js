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
    const response = await protectedApi.post('/transactions/me', input)
    return response.data
  },
}
