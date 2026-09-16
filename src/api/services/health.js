import { HEALTH_CHECK_TIMEOUT_MS } from '@/constants/api'
import { publicApi } from '@/lib/axios'

export const HealthService = {
  /**
   * Verifica se a API está disponível.
   * @returns {boolean} true quando a API responde com status 2xx.
   */
  check: async () => {
    const response = await publicApi.get('/health', {
      timeout: HEALTH_CHECK_TIMEOUT_MS,
    })
    return response.status >= 200 && response.status < 300
  },
}
