import { useEffect, useState } from 'react'

import logo from '@/assets/imagens/Logo.svg'

import { Progress } from './ui/progress'

const SIMULATED_MAX = 90

const ApiLoadingPage = () => {
  const [value, setValue] = useState(5)

  useEffect(() => {
    const interval = setInterval(() => {
      setValue((current) => {
        if (current >= SIMULATED_MAX) return current
        return Math.min(
          SIMULATED_MAX,
          current + (SIMULATED_MAX - current) * 0.08 + Math.random() * 2
        )
      })
    }, 400)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex min-h-screen w-screen flex-col items-center justify-center gap-6">
      <img src={logo} alt="Fintrack" />
      <p
        role="status"
        aria-live="polite"
        className="text-muted-foreground text-sm"
      >
        Iniciando o servidor…
      </p>
      <Progress value={value} className="w-64" />
    </div>
  )
}

export default ApiLoadingPage
