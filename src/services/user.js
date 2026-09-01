import { protectedApi, publicApi } from '@/lib/axios'

export const UserService = {
  /**
   * Cria um novo usuário.
   * @param {Object} input
   * @param {string} input.firstName
   * @param {string} input.lastName
   * @param {string} input.email
   * @param {string} input.password
   * @returns {Object} Usuário criado.
   * @returns {string} response.tokens - Tokens de autenticação.
   */
  signup: async (input) => {
    const response = await publicApi.post('/users', {
      first_name: input.firstName,
      last_name: input.lastName,
      email: input.email,
      password: input.password,
    })
    return {
      id: response.data.id,
      email: response.data.email,
      firstName: response.data.first_name,
      lastName: response.data.last_name,
      tokens: response.data.tokens,
    }
  },

  /**
   * Loga um usuário.
   * @param {Object} input
   * @param {string} input.email
   * @param {string} input.password
   * @returns {Object} Usuário.
   * @returns {string} response.tokens - Tokens de autenticação.
   */
  login: async (input) => {
    const response = await publicApi.post('/users/login', {
      email: input.email,
      password: input.password,
    })
    return {
      id: response.data.id,
      email: response.data.email,
      firstName: response.data.first_name,
      lastName: response.data.last_name,
      tokens: response.data.tokens,
    }
  },

  /**
   * Retorna um usuário autenticado.
   * @returns {Object} Usuário autenticado.
   */
  me: async () => {
    const response = await protectedApi.get('/users/me')
    return {
      id: response.data.id,
      email: response.data.email,
      firstName: response.data.first_name,
      lastName: response.data.last_name,
    }
  },

  /**
   * Retorna o balanço do usuário autenticado.
   * @param {Object} input
   * @param {string} input.from - Data inicial (YYYY-MM-DD).
   * @param {string} input.to - Data final (YYYY-MM-DD).
   */
  getBalance: async (input) => {
    const queryParams = new URLSearchParams()
    queryParams.set('from', input.from)
    queryParams.set('to', input.to)

    const response = await protectedApi.get(
      `/users/me/balance?${queryParams.toString()}`
    )
    return response.data
  },
}
