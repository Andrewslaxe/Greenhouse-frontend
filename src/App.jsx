import { Temperature } from './Temperature'
import './App.css'
import { Light } from './Light'
function App () {
  return (
    <>
      <div className='intro'>
        <div className='description'>
          <h1>Greenhouse</h1>
          <p>
          ¡Bienvenido a esta página web dedicada a los invernaderos inteligentes! Aquí podrás controlar todo sobre tu invernadero en cuanto a variables como la temperatura, humedad y luz.
          </p>
          <p>
          Un invernadero es un lugar donde las plantas pueden crecer y prosperar en un ambiente controlado. Pero para lograr que las plantas crezcan saludables y fuertes, es necesario controlar varias variables que optimicen este crecimiento.
          </p>
        </div>
        <img src='../polar-135.svg'/>
      </div>
      <div className='dashboard'>
        <Temperature />
      </div>
      <div className='dashboard lightdash'>
        <Light />
      </div>
    </>
  )
}

export default App
