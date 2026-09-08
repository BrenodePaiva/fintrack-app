import {
  Loader2Icon,
  PiggyBankIcon,
  PlusIcon,
  TrendingDownIcon,
  TrendingUpIcon,
} from 'lucide-react'
import { useState } from 'react'
import { Controller } from 'react-hook-form'
import { NumericFormat } from 'react-number-format'

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
import { useCreateTransactionForm } from '@/forms/hooks/transaction'

import { Button } from './ui/button'
import DatePicker from './ui/date-picker'
import { Field, FieldError, FieldGroup, FieldLabel } from './ui/field'
import { Input } from './ui/input'
import { toast } from './ui/toast'

const AddTransactionButton = () => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false)
  const { form, onSubmit } = useCreateTransactionForm({
    onSuccess: () => {
      toast.add({
        type: 'success',
        description: 'Transação criada com sucesso!.',
      })
      setDialogIsOpen(false)
    },
    onError: () => {
      toast.add({
        type: 'error',
        description: 'Erro ao criar transação.',
      })
    },
  })

  return (
    <>
      <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
        <DialogTrigger render={<Button />}>
          <PlusIcon />
          Nova transaçãos
        </DialogTrigger>
        <DialogContent className="min-w-107">
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
              <DialogClose
                render={
                  <Button
                    type="reset"
                    variant="secondary"
                    disabled={form.formState.isSubmitting}
                  />
                }
              >
                Cancelar
              </DialogClose>

              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting && (
                  <Loader2Icon className="animate-spin" />
                )}
                Adicionar
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default AddTransactionButton
