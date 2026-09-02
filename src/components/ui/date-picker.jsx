import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { CalendarIcon } from 'lucide-react'

import { Button } from './button'
import { Calendar } from './calendar'
import { Popover, PopoverContent, PopoverTrigger } from './popover'

const DatePicker = ({
  value,
  onChange,
  placeholder = 'Selecione uma data',
}) => {
  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button
            variant="outline"
            id="date-picker-simple"
            className="justify-start font-normal"
          >
            <CalendarIcon data-icon="inline-start" />
            {value ? (
              format(value, 'PPP', { locale: ptBR })
            ) : (
              <span>{placeholder}</span>
            )}
          </Button>
        }
      />
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={value}
          onSelect={onChange}
          defaultMonth={value}
          locale={ptBR}
        />
      </PopoverContent>
    </Popover>
  )
}

export default DatePicker
