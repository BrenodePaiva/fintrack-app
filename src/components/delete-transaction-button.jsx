import { Loader2Icon, Trash2Icon } from 'lucide-react'

import { useDeleteTransaction } from '@/api/hooks/transaction'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'

import { toast } from './ui/toast'

const DeleteTransactionButton = ({ transactionId }) => {
  const { mutate: deleteTransaction, isPending } = useDeleteTransaction()

  return (
    <AlertDialog>
      <div className="flex w-full justify-end">
        <AlertDialogTrigger
          render={<Button variant="ghost" className="text-destructive w-fit" />}
        >
          Deletar Transação <Trash2Icon />
        </AlertDialogTrigger>
      </div>

      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
            <Trash2Icon />
          </AlertDialogMedia>
          <AlertDialogTitle>Excluir transação?</AlertDialogTitle>
          <AlertDialogDescription>
            Isso excluirá permanentemente esta transação. Tem certeza que deseja
            excluir?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel variant="outline">Cancelar</AlertDialogCancel>
          <AlertDialogAction
            variant="destructive"
            disabled={isPending}
            onClick={() => {
              deleteTransaction(
                { id: transactionId },
                {
                  onSuccess: () => {
                    toast.add({
                      type: 'success',
                      description: 'Transação excluída com sucesso!',
                    })
                  },
                  onError: () => {
                    toast.add({
                      type: 'error',
                      description: 'Erro ao excluir a transação.',
                    })
                  },
                }
              )
            }}
          >
            {isPending && <Loader2Icon className="animate-spin" />}
            Excluir
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeleteTransactionButton
