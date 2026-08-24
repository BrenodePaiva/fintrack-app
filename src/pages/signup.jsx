import { Link } from 'react-router'

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
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'

const SignupPage = () => {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-3">
      <Card className="w-125">
        <CardHeader>
          <CardTitle>Crie a sua conta</CardTitle>
          <CardDescription>Insira os seus dados abaixo.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input placeholder="Digite seu nome" />
          <Input placeholder="Digite seu sobrenome" />
          <Input placeholder="Digite seu e-mail" />
          <PasswordInput />
          <PasswordInput placeholder="Digite sua senha novamente" />
          <FieldGroup className="w-72">
            <Field orientation="horizontal">
              <Checkbox id="terms" name="terms" defaultChecked />
              <FieldContent>
                <FieldLabel
                  htmlFor="terms"
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
          </FieldGroup>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Criar conta</Button>
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
    </div>
  )
}

export default SignupPage
