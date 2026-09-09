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
import { useAuthContext } from '@/contexts/auth'
import { useSignupForm } from '@/forms/hooks/user'

const SignupPage = () => {
  const { user, signup, isInitializing } = useAuthContext()

  const { form } = useSignupForm()

  const onSubmit = (data) => signup(data)

  if (isInitializing) return null

  if (user) return <Navigate to="/" />

  return (
    <div className="flex min-h-screen w-screen flex-col items-center justify-center gap-3">
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card className="w-125">
          <CardHeader>
            <CardTitle>Crie a sua conta</CardTitle>
            <CardDescription>Insira os seus dados abaixo.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FieldGroup className="w-full">
              <Controller
                name="firstName"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="first-name-form">Nome</FieldLabel>
                    <Input
                      {...field}
                      id="first-name-form"
                      aria-invalid={fieldState.invalid}
                      placeholder="Digite seu nome"
                      autoComplete="given-name"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="lastName"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="last-name-form">Sobrenome</FieldLabel>
                    <Input
                      {...field}
                      id="last-name-form"
                      aria-invalid={fieldState.invalid}
                      placeholder="Digite seu sobrenome"
                      autoComplete="family-name"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

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
                      autoComplete="new-password"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="passwordConfirmation"
                control={form.control}
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
                      autoComplete="new-password"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="terms"
                control={form.control}
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
            <Button
              type="submit"
              className="w-full"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting && (
                <Loader2Icon className="animate-spin" />
              )}
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
