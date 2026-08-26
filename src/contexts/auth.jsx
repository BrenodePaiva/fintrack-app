import { useMutation } from '@tanstack/react-query'
import { createContext, useEffect, useState } from 'react'

import { toast } from '@/components/ui/toast'
import { api } from '@/lib/axios'

export const AuthContext = createContext({
  user: null,
  login: () => {},
  signup: () => {},
})

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState()

  const signupMutation = useMutation({
    mutationKey: ['signup'],
    mutationFn: async (variables) => {
      const response = await api.post('/users', {
        first_name: variables.firstName,
        last_name: variables.lastName,
        email: variables.email,
        password: variables.password,
      })
      return response.data
    },
  })

  const loginMutation = useMutation({
    mutationKey: ['login'],
    mutationFn: async (variables) => {
      const response = await api.post('/users/login', {
        email: variables.email,
        password: variables.password,
      })
      return response.data
    },
  })

  useEffect(() => {
    const init = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken')
        const refreshToken = localStorage.getItem('refreshToken')
        if (!accessToken && !refreshToken) return
        const response = await api.get('/users/me', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        setUser(response.data)
      } catch (error) {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        console.log(error)
      }
    }
    init()
  }, [])

  const signup = (data) => {
    signupMutation.mutate(data, {
      onSuccess: (createdUser) => {
        const accessToken = createdUser.tokens.accessToken
        const refreshToken = createdUser.tokens.refreshToken
        setUser(createdUser)
        localStorage.setItem('accessToken', accessToken)
        localStorage.setItem('refreshToken', refreshToken)
        toast.add({
          type: 'success',
          description: 'Usuário cadastrado com sucesso!',
        })
      },
      onError: () => {
        toast.add({
          type: 'error',
          description: 'Erro ao criar conta. Tente novamente mais tarde.',
        })
      },
    })
  }

  const login = (data) => {
    loginMutation.mutate(data, {
      onSuccess: (logeedUser) => {
        const accessToken = logeedUser.tokens.accessToken
        const refreshToken = logeedUser.tokens.refreshToken
        setUser(logeedUser)
        localStorage.setItem('accessToken', accessToken)
        localStorage.setItem('refreshToken', refreshToken)
        toast.add({
          type: 'success',
          description: 'Login realizado com sucesso!',
        })
      },
      onError: () => {
        toast.add({
          type: 'error',
          description: 'Erro ao entrar no conta. Tente novamente mais tarde.',
        })
      },
    })
  }

  return (
    <AuthContext.Provider value={{ user, signup, login }}>
      {children}
    </AuthContext.Provider>
  )
}
