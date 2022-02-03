import './styles.css'
import { formaterMoneyBrl, formaterDateBr } from '../../util/formatters'

import imgLapis from '../../assets/lapis.svg'
import imgLixeira from '../../assets/lixeira.svg'
import setaBackgroundConfirm from '../../assets/seta-background-confirm.svg'
import { useContext } from 'react'
import TransactionsContext from '../../context'

function Transacoes() {
  
  const {
    transacoes,
    setTransacoes,
    setTransacaoExcluida,
    setModalEditarTransacao,
    setFormulario,
    transacaoExcluida
  } = useContext(TransactionsContext)


  function handleClickModalExcluir(transacaoId) {
    const novasTransacoes = [...transacoes]
    const findTransacao = novasTransacoes.find(
      transacao => transacao.id === transacaoId
    )
    findTransacao.modalDelete = true

    setTransacoes(novasTransacoes)
  }

  async function handleClickEcluir(idTransacao) {
    const transacoesAtuais = transacoes.filter(
      transacao => transacao.id !== idTransacao
    )
    setTransacoes(transacoesAtuais)

    if (transacaoExcluida === false) {
      setTransacaoExcluida(true)
    } else {
      setTransacaoExcluida(false)
    }

    try {
      await fetch(`http://localhost:3333/transactions/${idTransacao}`, {
        method: 'DELETE',
        headers: {
          'content-type': 'application/json'
        }
      })
    } catch (error) {
      console.log(error.message)
    }
  }

  function fecharModalDelete(transacaoId) {
    const novasTransacoes = [...transacoes]
    const findTransacao = novasTransacoes.find(
      transacao => transacao.id === transacaoId
    )
    findTransacao.modalDelete = false
    console.log(novasTransacoes)
    setTransacoes(novasTransacoes)
  }

  return transacoes.map(transacao => (
    <div key={transacao.id} className="table-line">
      <div className="span-valores-registro">
        <span>{formaterDateBr(transacao.date)}</span>
        <span>{transacao.week_day}</span>
        <span>{transacao.description}</span>
        <span>{transacao.category}</span>
        <span
          className={transacao.type === 'credit' ? 'cor-entrada' : 'cor-saida'}
        >
          {formaterMoneyBrl(transacao.value)}
        </span>
      </div>
      <div className="container-imgs-lapis-lixeira">
        <img
          src={imgLapis}
          alt="Ícone lápis"
          onClick={() => {
            setModalEditarTransacao(true)
            const transacaoAtual = transacoes.find(
              transacaoParam => transacaoParam.id === transacao.id
            )
            setFormulario({
              valor: transacaoAtual.value,
              categoria: transacaoAtual.category,
              data: formaterDateBr(transacaoAtual.date),
              descricao: transacaoAtual.description,
              id: transacaoAtual.id
            })
          }}
        />
        <img
          src={imgLixeira}
          alt="Ícone lixeira"
          onClick={() => handleClickModalExcluir(transacao.id)}
        />
      </div>
      <div
        className={
          transacao.modalDelete === true ? 'container-all-confirm' : 'escondido'
        }
      >
        <img src={setaBackgroundConfirm} alt="" />
        <div className="container-confirm-delete">
          <h1>Apagar item?</h1>
          <div className="container-btns-confirm-delete">
            <button
              className="btn-actions-confirm-delete"
              onClick={() => handleClickEcluir(transacao.id)}
            >
              Sim
            </button>
            <button
              className="btn-actions-confirm-delete"
              onClick={() => fecharModalDelete(transacao.id)}
            >
              Não
            </button>
          </div>
        </div>
      </div>
    </div>
  ))
}

export default Transacoes
