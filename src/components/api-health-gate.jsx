import { useApiHealth } from '@/api/hooks/health'

import ApiLoadingPage from './api-loading-page'

const ApiHealthGate = ({ children }) => {
  const { isReady } = useApiHealth()

  if (!isReady) return <ApiLoadingPage />

  return children
}

export default ApiHealthGate
