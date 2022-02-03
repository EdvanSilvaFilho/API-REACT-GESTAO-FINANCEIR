import './styles.css'
import Header from '../../components/Header/index'
import Transacoes from '../../components/Transactions/index'
import ModalTransacao from '../../components/ModalTransacao/index'
import BtnsHead from '../../components/BtnsHead/index'
import Filter from '../../components/Filter/index'
import { formaterMoneyBrl } from '../../util/formatters'

import { useState, useEffect } from 'react'

import TansactionsContext from '../../context'

function Main() {
  const [transacoes, setTransacoes] = useState([])
  const [btnsModalTransacao, setBtnsModalTransacao] = useState({
    btnsPadraoModal: 'debit'
  })
  const [formulario, setFormulario] = useState({
    valor: '',
    categoria: '',
    data: '',
    descricao: ''
  })
  const [entradas, setEntradas] = useState(0)
  const [saidas, setSaidas] = useState(0)
  const [submitAddTransacao, setSubmitAddTransacao] = useState(false)
  const [modalTransacao, setModalTransacao] = useState(false)
  const [modalEditarTransacao, setModalEditarTransacao] = useState(false)
  const [saldo, setSaldo] = useState(0)
  const [transacaoExcluida, setTransacaoExcluida] = useState(false)
  const [orderAction, setOrderAction] = useState(false)

  useEffect(() => {
    async function loadTransacoes() {
      try {
        const responseApiTransacoes = await fetch(
          'http://localhost:3333/transactions',
          {
            method: 'GET',
            headers: {
              'content-type': 'application/json'
            }
          }
        )

        const dadosTransacoes = await responseApiTransacoes.json()
        const novosDados = dadosTransacoes.map(transacao => {
          return { ...transacao, modalDelete: false }
        })
        setTransacoes(novosDados)
        const arrayEntradas = dadosTransacoes.filter(
          transacao => transacao.type === 'credit'
        )
        const arraySaidas = dadosTransacoes.filter(
          transacao => transacao.type === 'debit'
        )

        const valorEntradas = arrayEntradas
          .map(entrada => entrada.value)
          .reduce((acumulador, entrada) => acumulador + entrada, 0)
        const valorSaidas = arraySaidas
          .map(entrada => entrada.value)
          .reduce((acumulador, saida) => acumulador + saida, 0)
        const valorSaldo = valorEntradas - valorSaidas

        setEntradas(valorEntradas)
        setSaidas(valorSaidas)
        setSaldo(valorSaldo)
        setOrderAction(orderAction === false ? true : false)
      } catch (error) {
        console.log(error.massage)
      }
    }
    loadTransacoes()
  }, [submitAddTransacao, transacaoExcluida])

  function TabelaResumo() {
    return (
      <aside className="container-all-resume">
        <div className="container-resume">
          <h1>Resumo</h1>
          <div className="resumo-entradas-saidas">
            <div>
              <span>Entradas</span>
              <span className="in">{formaterMoneyBrl(entradas)}</span>
            </div>
            <div>
              <span>Saídas</span>
              <span className="out">{formaterMoneyBrl(saidas)}</span>
            </div>
          </div>
          <div className="container-balance">
            <span>Saldo</span>
            <span className="balance">{formaterMoneyBrl(saldo)}</span>
          </div>
        </div>
        <button
          className="btn-add"
          onClick={() => {
            setModalTransacao(true)
            setSubmitAddTransacao(false)
          }}
        >
          <span>Adicionar Registro</span>
        </button>
      </aside>
    )
  }

  const valuesContext = {
    transacoes, 
    setTransacoes, 
    btnsModalTransacao, 
    setBtnsModalTransacao, 
    formulario, 
    setFormulario, 
    entradas, 
    setEntradas, 
    saidas, 
    setSaidas, 
    submitAddTransacao, 
    setSubmitAddTransacao, 
    modalTransacao, 
    setModalTransacao, 
    modalEditarTransacao, 
    setModalEditarTransacao, 
    saldo, 
    setSaldo, 
    transacaoExcluida, 
    setTransacaoExcluida, 
    orderAction, 
    setOrderAction
  }

  return (
    <TansactionsContext.Provider value={valuesContext}>
    <div className="App">
      <Header />
      <div className="container-geral">
        <section className="all-elements">
          <div className="btn-and-table">
            <Filter />
            <div className="table">
              <div className="table-head">
                <BtnsHead
                  transacoes={transacoes}
                  setTransacoes={setTransacoes}
                  orderAction={orderAction}
                  setOrderAction={setOrderAction}
                />
              </div>
              <Transacoes
                transacoes={transacoes}
                setTransacoes={setTransacoes}
                setTransacaoExcluida={setTransacaoExcluida}
                setModalEditarTransacao={setModalEditarTransacao}
                setFormulario={setFormulario}
                transacaoExcluida={transacaoExcluida}
              />
            </div>
          </div>
          <TabelaResumo />
        </section>
      </div>
      {modalTransacao && (
        <ModalTransacao
          typeModal={'adicionar'}
          btnsModalTransacao={btnsModalTransacao}
          formulario={formulario}
          setSubmitAddTransacao={setSubmitAddTransacao}
          setBtnsModalTransacao={setBtnsModalTransacao}
          setModalTransacao={setModalTransacao}
          setModalEditarTransacao={setModalEditarTransacao}
          setFormulario={setFormulario}
        />
      )}
      {modalEditarTransacao && (
        <ModalTransacao
          typeModal={'editar'}
          btnsModalTransacao={btnsModalTransacao}
          formulario={formulario}
          setBtnsModalTransacao={setBtnsModalTransacao}
          setModalTransacao={setModalTransacao}
          setModalEditarTransacao={setModalEditarTransacao}
          setFormulario={setFormulario}
          submitAddTransacao={submitAddTransacao}
          setSubmitAddTransacao={setSubmitAddTransacao}
        />
      )}
    </div>
    </TansactionsContext.Provider>
  )
}

export default Main
