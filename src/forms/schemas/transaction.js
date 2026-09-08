import z from 'zod'

export const createTransactionFormSchema = z.object({
  name: z.string().trim().min(1, { error: 'O nome é obrigatório' }),
  amount: z
    .number({ error: 'O valor é obrigatório' })
    .min(1, { error: 'O valor tem que ser maior que 0.' }),
  date: z.date({ error: 'A data é obrigatória.' }),
  type: z.enum(['EARNING', 'EXPENSE', 'INVESTMENT'], {
    error: 'O tipo deve ser EARNING, EXPENSE ou INVESTMENT.',
  }),
})
