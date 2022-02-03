import { format } from 'date-fns'

function formaterMoneyBrl(value) {
  const valueBrl = value.toLocaleString('pt-br', {
    style: 'currency',
    currency: 'BRL'
  })
  return valueBrl
}

function formaterDateBr(date) {
  const dataCurrent = new Date(date)
  const dateBr = format(dataCurrent, 'dd/MM/yyyy')
  return dateBr
}

export { formaterMoneyBrl, formaterDateBr }
