import { useEffect, useState } from 'react'

import { HealthService } from '@/api/services/health'
import { HEALTH_CHECK_INTERVAL_MS } from '@/constants/api'

export const useApiHealth = () => {
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    let cancelled = false
    let timeoutId = null

    const check = async () => {
      try {
        const healthy = await HealthService.check()
        if (cancelled) return
        if (healthy) {
          setIsReady(true)
          return
        }
      } catch {
        // API ainda indisponível (cold start, timeout ou falha de rede).
        // Mantém a loading page e agenda uma nova tentativa abaixo.
        if (cancelled) return
      }
      timeoutId = setTimeout(check, HEALTH_CHECK_INTERVAL_MS)
    }

    check()

    return () => {
      cancelled = true
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [])

  return { isReady }
}
