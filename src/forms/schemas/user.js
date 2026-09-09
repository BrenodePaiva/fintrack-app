import z from 'zod'

export const loginFormSchema = z.object({
  email: z
    .email({ error: 'O e-mail é inválido.' })
    .trim()
    .min(1, { error: 'O campo e-mail é obrigatório.' }),
  password: z
    .string()
    .trim()
    .min(6, { error: 'O campo senha deve ter no mínimo 6 caracteres.' }),
})

export const signupFormSchema = z
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
