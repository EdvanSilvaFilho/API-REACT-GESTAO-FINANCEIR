import setaCima from '../../assets/seta-cima.svg'
import setaBaixo from '../../assets/seta-baixo.svg'
import './styles.css'
import { useState, useEffect, useContext } from 'react'
import { orderByAsc, orderByDesc } from '../../util/ordenationArray'
import TransactionContext from '../../context'


function BtnsHead() {
  const { transacoes, setTransacoes, orderAction } = useContext(TransactionContext)
  
  const [filter, setFilter] = useState('')
  const [order, setOrder] = useState('asc')

  useEffect(() => {
    if (order === 'asc') {
      ordenationAsc(filter)
      return
    }
    ordenationDesc(filter)
  }, [order, filter, orderAction])

  function ordenationAsc(filter) {
    const transacoesAsc = [...transacoes]

    transacoesAsc.sort((a, b) => orderByAsc(a, b, filter))

    setTransacoes(transacoesAsc)
  }

  function ordenationDesc(filter) {
    const transacoesAsc = [...transacoes]

    transacoesAsc.sort((a, b) => orderByDesc(a, b, filter))

    setTransacoes(transacoesAsc)
  }

  function hanldeClickOrdenation(type) {
    if (filter === type) {
      setOrder(order === 'asc' ? 'desc' : 'asc')
      return
    }
    console.log(type)
    setFilter(type)
  }

  return (
    <div className="btns-head">
      <button
        id="date"
        onClick={() => {
          hanldeClickOrdenation('date')
        }}
      >
        <span>Data</span>
        {filter === 'date' && (
          <img src={order === 'asc' ? setaCima : setaBaixo} alt="Ícone seta" />
        )}
      </button>
      <button
        id="week-day"
        onClick={() => {
          hanldeClickOrdenation('week-day')
        }}
      >
        <span>Dia da semana</span>
        {filter === 'week-day' && (
          <img src={order === 'asc' ? setaCima : setaBaixo} alt="Ícone seta" />
        )}
      </button>
      <button>
        <span>Descrição</span>
      </button>
      <button>
        <span>Categoria</span>
      </button>
      <button
        id="value"
        onClick={() => {
          hanldeClickOrdenation('value')
        }}
      >
        <span>Valor</span>
        {filter === 'value' && (
          <img src={order === 'asc' ? setaCima : setaBaixo} alt="Ícone seta" />
        )}
      </button>
    </div>
  )
}

export default BtnsHead
