import { Loader2Icon } from 'lucide-react'
import { Controller } from 'react-hook-form'
import { Link, Navigate } from 'react-router'

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
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { useAuthContext } from '@/contexts/auth'
import { useLoginForm } from '@/forms/hooks/user'

const LoginPage = () => {
  const { user, login, isInitializing } = useAuthContext()

  const { form } = useLoginForm()

  const onSubmit = (data) => login(data)

  if (isInitializing) return null

  if (user) return <Navigate to="/" />

  return (
    <div className="flex min-h-screen w-screen flex-col items-center justify-center gap-3">
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card className="w-125">
          <CardHeader>
            <CardTitle>Faça login</CardTitle>
            <CardDescription>
              Insira seus dados para acessar sua conta.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FieldGroup className="w-full">
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="email-form">E-mail</FieldLabel>
                    <Input
                      {...field}
                      id="email-form"
                      aria-invalid={fieldState.invalid}
                      placeholder="Digite seu e-mail"
                      autoComplete="email"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="password-form">Senha</FieldLabel>
                    <PasswordInput
                      {...field}
                      id="password-form"
                      aria-invalid={fieldState.invalid}
                      autoComplete="current-password"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              className="w-full"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting && (
                <Loader2Icon className="animate-spin" />
              )}
              Entrar
            </Button>
          </CardFooter>
        </Card>

        <div className="flex items-center justify-center">
          <p className="text-muted-foreground text-center">
            Não possui uma conta?
          </p>
          <Button
            variant="link"
            nativeButton={false}
            render={<Link to="/signup">Crie sua conta</Link>}
          ></Button>
        </div>
      </form>
    </div>
  )
}

export default LoginPage
