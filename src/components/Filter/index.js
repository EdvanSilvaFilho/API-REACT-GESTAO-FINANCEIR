import './styles.css'

import Cards from '../Cards'

import imgFiltro from '../../assets/filtro.svg'

import { useState } from 'react'


function Filter() {
  const [openFilter, setOpenFilter] = useState(false)

  return (
    <div>
      <button 
      className="open-filters-button"
      onClick={() => setOpenFilter(!openFilter)}
      >
        <img src={imgFiltro} alt="Ícone filtro" />
        <span>Filtro</span>
      </button>
      {openFilter && 
      <div className="table-filters">
        <div className="container-cards-table">
          <h3>Dia da Semana</h3>
          <div className="cards-table">
            <Cards/>
            <Cards/>
            <Cards/>
            <Cards/>
            <Cards/>
            <Cards/>
            <Cards/>
          </div>
        </div>
        <div className="container-cards-table">
          <h3>Categoria</h3>
          <div id="segundo-container" className="cards-table">
            <Cards/>
          </div>
        </div>
        <div className="container-cards-table">
          <h3>Valor</h3>
          <div id="terceiro-container" className="cards-table">
            <label htmlFor="">Min</label>
            <input id='min' type="number"></input>
            <label htmlFor="">Max</label>
            <input id='max' type="number"></input>
          </div>
        </div>
        <div id='ultimo-container' className="cards-table">
          <button className="btn-limpar-filtros">
            <span>Limpar Filtros</span>
          </button>
          <button className="btn-aplicar-filtros">
          <span>Aplicar Filtros</span>
          </button>
        </div>
      </div>
      }
    </div>
  )
}

export default Filter