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
