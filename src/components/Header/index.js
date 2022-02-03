import './styles.css'
import logoDindin from '../../assets/logoDindin.svg'

function Header() {
  return (
    <header className="container-header">
      <div className="logo-name">
        <img src={logoDindin} alt="Logo da aplicação." />
        <h1>Dindin</h1>
      </div>
    </header>
  )
}

export default Header
