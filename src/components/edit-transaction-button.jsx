import {
  ExternalLinkIcon,
  Loader2Icon,
  PiggyBankIcon,
  TrendingDownIcon,
  TrendingUpIcon,
} from 'lucide-react'
import { useState } from 'react'
import { Controller } from 'react-hook-form'
import { NumericFormat } from 'react-number-format'

import { useEditTransactionForm } from '@/forms/hooks/transaction'

import { Button } from './ui/button'
import DatePicker from './ui/date-picker'
import { Field, FieldError, FieldGroup, FieldLabel } from './ui/field'
import { Input } from './ui/input'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet'
import { toast } from './ui/toast'

const EditTransactionButton = ({ transaction }) => {
  const [sheetIsOpen, setSheetIsOpen] = useState(false)
  const { form, onSubmit } = useEditTransactionForm({
    transaction,
    onSuccess: () => {
      toast.add({
        type: 'success',
        description: 'Transação atualizada com sucesso!.',
      })
      setSheetIsOpen(false)
    },
    onError: () => {
      toast.add({
        type: 'error',
        description: 'Erro ao atualizar a transação.',
      })
    },
  })
  return (
    <Sheet open={sheetIsOpen} onOpenChange={setSheetIsOpen}>
      <SheetTrigger render={<Button variant="ghost" size="icon" />}>
        <ExternalLinkIcon className="text-muted-foreground" />
      </SheetTrigger>
      <SheetContent className="min-w-105">
        <SheetHeader>
          <SheetTitle>Editar Transação</SheetTitle>
          <SheetDescription>{transaction?.name}</SheetDescription>
        </SheetHeader>

        <form
          id="form-edit-transaction"
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8"
        >
          <div className="grid flex-1 auto-rows-min gap-6 px-4">
            <FieldGroup>
              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-edit-transaction-name">
                      Nome
                    </FieldLabel>
                    <Input
                      {...field}
                      id="form-edit-transaction-name"
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
                    <FieldLabel htmlFor="form-edit-transaction-amount">
                      Valor
                    </FieldLabel>
                    <NumericFormat
                      id="form-edit-transaction-amount"
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
                    <FieldLabel htmlFor="form-edit-transaction-date">
                      Data
                    </FieldLabel>
                    <DatePicker {...field} id="form-edit-transaction-date" />

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
                    <FieldLabel htmlFor="form-edit-transaction-type">
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
          </div>
          <SheetFooter className="grid grid-cols-2 gap-4">
            <SheetClose
              render={
                <Button
                  type="reset"
                  variant="secondary"
                  disabled={form.formState.isSubmitting}
                />
              }
            >
              Cancelar
            </SheetClose>

            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting && (
                <Loader2Icon className="animate-spin" />
              )}
              Salvar
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  )
}

export default EditTransactionButton
