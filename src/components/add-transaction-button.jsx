import { zodResolver } from '@hookform/resolvers/zod'
import {
  PiggyBankIcon,
  PlusIcon,
  TrendingDownIcon,
  TrendingUpIcon,
} from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'
import { NumericFormat } from 'react-number-format'
import z from 'zod'

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

import { Button } from './ui/button'
import DatePicker from './ui/date-picker'
import { Field, FieldError, FieldGroup, FieldLabel } from './ui/field'
import { Input } from './ui/input'

const formSchema = z.object({
  name: z.string().trim().min(1, { error: 'O nome é obrigatório' }),
  amount: z
    .number({ error: 'O valor é obrigatório' })
    .min(1, { error: 'O valor tem que ser maior que 0.' }),
  date: z.date({ error: 'A data é obrigatória.' }),
  type: z.enum(['EARNING', 'EXPENSE', 'INVESTMENT'], {
    error: 'O tipo deve ser EARNING, EXPENSE or INVESTMENT.',
  }),
})

const AddTransactionButton = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      amount: 50,
      date: new Date(),
      type: 'EARNING',
    },
    shouldUnregister: true,
  })

  const onSubmit = (data) => console.log(data)
  return (
    <>
      <Dialog>
        <DialogTrigger render={<Button />}>
          <PlusIcon />
          Nova transaçãos
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Adicionar Transação</DialogTitle>
            <DialogDescription>Insira as informações abaixo.</DialogDescription>
          </DialogHeader>

          <form
            id="form-transaction"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8"
          >
            <FieldGroup>
              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-transaction-name">
                      Nome
                    </FieldLabel>
                    <Input
                      {...field}
                      id="form-transaction-name"
                      aria-invalid={fieldState.invalid}
                      placeholder="Digite o nome da transação"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="amount"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-transaction-amount">
                      Valor
                    </FieldLabel>
                    <NumericFormat
                      id="form-transaction-amount"
                      aria-invalid={fieldState.invalid}
                      placeholder="Digite o valor da transação"
                      thousandSeparator="."
                      decimalSeparator=","
                      prefix="R$ "
                      allowNegative={false}
                      customInput={Input}
                      {...field}
                      onChange={() => {}}
                      onValueChange={(value) =>
                        field.onChange(value.floatValue)
                      }
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="date"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-transaction-date">
                      Data
                    </FieldLabel>
                    <DatePicker {...field} id="form-transaction-date" />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="type"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-transaction-type">
                      Tipo
                    </FieldLabel>
                    <div className="grid grid-cols-3 gap-4">
                      <Button
                        variant={
                          field.value === 'EARNING' ? 'secondary' : 'outline'
                        }
                      >
                        <TrendingUpIcon
                          className="text-primary-green"
                          onClick={() => field.onChange('EARNING')}
                        />
                        Ganho
                      </Button>

                      <Button
                        variant={
                          field.value === 'EXPENSE' ? 'secondary' : 'outline'
                        }
                        onClick={() => field.onChange('EXPENSE')}
                      >
                        <TrendingDownIcon className="text-primary-red" />
                        Gasto
                      </Button>

                      <Button
                        variant={
                          field.value === 'INVESTMENT' ? 'secondary' : 'outline'
                        }
                        onClick={() => field.onChange('INVESTMENT')}
                      >
                        <PiggyBankIcon className="text-primary-blue" />
                        Investimento
                      </Button>
                    </div>
                  </Field>
                )}
              />
            </FieldGroup>
            <DialogFooter className="grid grid-cols-2 gap-4">
              <DialogClose render={<Button type="reset" variant="secondary" />}>
                Cancelar
              </DialogClose>

              <Button type="submit">Adicionar</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default AddTransactionButton
