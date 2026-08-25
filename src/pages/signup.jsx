import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Link } from 'react-router'
import z from 'zod'

import PasswordInput from '@/components/password-input'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/toast'
import { api } from '@/lib/axios'

const signupSchema = z
  .object({
    firstName: z.string().trim().min(1, {
      error: 'O campo nome é obrigatório.',
    }),
    lastName: z.string().trim().min(1, {
      error: 'O campo sobrenome é obrigatório.',
    }),
    email: z
      .email({ error: 'O e-mail é invalido.' })
      .trim()
      .min(1, { error: 'O campo e-mail é obrigatório.' }),
    password: z
      .string()
      .trim()
      .min(6, { error: 'O campo senha deve ter no mínimo 6 caracteres.' }),
    passwordConfirmation: z.string().trim(),
    // terms precisa ser 'true'
    terms: z.boolean().refine((value) => value === true, {
      error: 'Você precisa aceitar os termos de uso.',
    }),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    error: 'As senhas não coincidem.',
    path: ['passwordConfirmation'],
  })

const SignupPage = () => {
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
  const methods = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      terms: false,
    },
  })

  const onSubmit = (data) => {
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

  if (user) {
    return <h1>Olá, {user.first_name}!</h1>
  }

  return (
    <div className="flex min-h-screen w-screen flex-col items-center justify-center gap-3">
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Card className="w-125">
          <CardHeader>
            <CardTitle>Crie a sua conta</CardTitle>
            <CardDescription>Insira os seus dados abaixo.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FieldGroup className="w-full">
              <Controller
                name="firstName"
                control={methods.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="first-name-form">Nome</FieldLabel>
                    <Input
                      {...field}
                      id="first-name-form"
                      aria-invalid={fieldState.invalid}
                      placeholder="Digite seu nome"
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="lastName"
                control={methods.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="last-name-form">Sobrenome</FieldLabel>
                    <Input
                      {...field}
                      id="last-name-form"
                      aria-invalid={fieldState.invalid}
                      placeholder="Digite seu sobrenome"
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="email"
                control={methods.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="email-form">E-mail</FieldLabel>
                    <Input
                      {...field}
                      id="email-form"
                      aria-invalid={fieldState.invalid}
                      placeholder="Digite seu e-mail"
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="password"
                control={methods.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="password-form">Senha</FieldLabel>
                    <PasswordInput
                      {...field}
                      id="password-form"
                      aria-invalid={fieldState.invalid}
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="passwordConfirmation"
                control={methods.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="password-confirmation-form">
                      Confirmação de senha
                    </FieldLabel>
                    <PasswordInput
                      {...field}
                      id="password-confirmation-form"
                      aria-invalid={fieldState.invalid}
                      placeholder="Digite novamente sua senha"
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="terms"
                control={methods.control}
                render={({ field, fieldState }) => (
                  <div>
                    <FieldSet data-invalid={fieldState.invalid}>
                      <Field orientation="horizontal">
                        <Checkbox
                          id="terms-form"
                          name={field.name}
                          aria-invalid={fieldState.invalid}
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                        <FieldContent>
                          <FieldLabel
                            htmlFor="terms-form"
                            className="text-muted-foreground text-xs opacity-75"
                          >
                            <p>
                              Ao clicar em "Criar conta", você aceita{' '}
                              <a href="#" className="text-white underline">
                                nosso termo de uso e política de privacidade.
                              </a>
                            </p>
                          </FieldLabel>
                        </FieldContent>
                      </Field>
                    </FieldSet>

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </div>
                )}
              />
            </FieldGroup>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">
              Criar conta
            </Button>
          </CardFooter>
        </Card>

        <div className="flex items-center justify-center">
          <p className="text-muted-foreground text-center">
            Já possui uma conta?
          </p>
          <Button
            variant="link"
            nativeButton={false}
            render={<Link to="/login">Faça login</Link>}
          ></Button>
        </div>
      </form>
    </div>
  )
}

export default SignupPage
