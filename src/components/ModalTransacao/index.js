import imgFecharModal from '../../assets/closeBtn.svg'
import './styles.css'
import InputMask from 'react-input-mask'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { useContext } from 'react'
import TransactionsContext from '../../context'

function ModalTransacao({ handleChangeInputs }) {
  const { 
    formulario, 
    setFormulario, 
    btnsModalTransacao, 
    setModalTransacao, 
    setModalEditarTransacao,
    setBtnsModalTransacao,
    typeModal,
    submitAddTransacao,
    setSubmitAddTransacao
  } = useContext(TransactionsContext)

  async function handleClickAddTransacao(event) {
    event.preventDefault()
    const [dia, mes, ano] = formulario.data.split('/')

    const data = new Date(`${mes}/${dia}/${ano}`)

    try {
      const dadosAddTransacao = {
        date: data,
        week_day: format(data, 'eee', {
          locale: ptBR
        }),
        description: formulario.descricao,
        value: Number(formulario.valor),
        category: formulario.categoria,
        type: btnsModalTransacao.btnsPadraoModal
      }
      const promiseAddTransacao = await fetch(
        'http://localhost:3333/transactions',
        {
          method: 'POST',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify(dadosAddTransacao)
        }
      )

      await promiseAddTransacao.json()
    } catch (error) {
      console.log(error.message)
    }

    setFormulario({
      ...formulario,
      valor: '',
      categoria: '',
      data: '',
      descricao: ''
    })
    setModalTransacao(false)
    setSubmitAddTransacao(true)
  }

  async function handleClickEditarTransacao(event, transacaoId) {
    event.preventDefault()

    const [dia, mes, ano] = formulario.data.split('/')

    const data = new Date(`${mes}/${dia}/${ano}`)

    try {
      const dadosAddTransacao = {
        date: data,
        week_day: format(data, 'eee', {
          locale: ptBR
        }),
        description: formulario.descricao,
        value: Number(formulario.valor),
        category: formulario.categoria,
        type: btnsModalTransacao.btnsPadraoModal
      }
      const promiseAddTransacao = await fetch(
        `http://localhost:3333/transactions/${transacaoId}`,
        {
          method: 'PATCH',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify(dadosAddTransacao)
        }
      )

      await promiseAddTransacao.json()
    } catch (error) {
      console.log(error.message)
    }
    setFormulario({
      ...formulario,
      valor: '',
      categoria: '',
      data: '',
      descricao: ''
    })
    setModalEditarTransacao(false)
    setSubmitAddTransacao(submitAddTransacao === false ? true : false)
  }
  function handleChangeInputs({ target }) {
    setFormulario({
      ...formulario,
      [target.name]: target.value
    })
  }
  return (
    <div key="Modal" className="all-container-modal">
      <div className="modal-container">
        <div className="container-titulo-and-img-fechar-modal">
          <h1>
            {typeModal === 'adicionar'
              ? 'Adicionar Registro'
              : 'Editar Registro'}
          </h1>
          <img
            src={imgFecharModal}
            alt="Ícone de fechar modal"
            onClick={() => {
              setModalTransacao(false)
              setModalEditarTransacao(false)
              setFormulario({
                ...formulario,
                valor: '',
                categoria: '',
                data: '',
                descricao: ''
              })
            }}
          />
        </div>
        <div className="btns-credito-debito">
          <button
            id="credit-button"
            className={
              btnsModalTransacao.btnsPadraoModal === 'debit'
                ? 'cor-cinza'
                : 'cor-btn-credit'
            }
            onClick={() =>
              setBtnsModalTransacao({
                ...btnsModalTransacao,
                btnsPadraoModal: 'credit'
              })
            }
          >
            Entrada
          </button>
          <button
            id="debit-button"
            className={
              btnsModalTransacao.btnsPadraoModal === 'credit'
                ? 'cor-cinza'
                : 'cor-btn-debit'
            }
            onClick={() =>
              setBtnsModalTransacao({
                ...btnsModalTransacao,
                btnsPadraoModal: 'debit'
              })
            }
          >
            Saida
          </button>
        </div>
        <form className="formulario-adicionar-transacao">
          <label htmlFor="input-1">Valor</label>
          <input
            id="input-1"
            name="valor"
            type="number"
            value={formulario.valor}
            key="1"
            onChange={handleChangeInputs}
          />
          <label htmlFor="input-2">Categoria</label>
          <input
            id="input-2"
            name="categoria"
            type="text"
            key="2"
            value={formulario.categoria}
            onChange={handleChangeInputs}
          />
          <label htmlFor="input-3">Data</label>
          <InputMask
            mask="99/99/9999"
            id="input-3"
            name="data"
            value={formulario.data}
            onChange={handleChangeInputs}
          />
          <label htmlFor="input-4">Descrição</label>
          <input
            id="input-4"
            name="descricao"
            type="text"
            value={formulario.descricao}
            onChange={handleChangeInputs}
          />
          <button
            onClick={
              typeModal === 'editar'
                ? event => handleClickEditarTransacao(event, formulario.id)
                : handleClickAddTransacao
            }
          >
            Confirmar
          </button>
        </form>
      </div>
    </div>
  )
}

export default ModalTransacao
