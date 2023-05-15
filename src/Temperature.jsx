import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

import temperature from './services/temperature'

import './slider.css'
import { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const options = {
  responsive: true,
  plugins: {
    legend: { display: false },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
      ticks: {
        color: 'white',
      },
      title: {
        display: true,
        text: 'Hora',
        color: 'white',
      }
    },
    y: {
      title: {
        display: true,        
        text: 'Temperatura (°C)',
        color: 'white',
      },
      grid: {
        display: false,
      },
      ticks: {
        color: 'white',
      },
    },
  },

}

export function Temperature(){
  const [allTemperature, setAllTemperature] = useState([])
  const [allDates, setAllDates] = useState([])
  const [actualTemperature, setActualTemperature] = useState(0)
  const [idealTemperature, setIdealTemperature] = useState(0)

  useEffect(() => {
    temperature.fetchTemperature().then((temperature) => {
      setAllTemperature(temperature.map((t) => parseFloat(t.value)) )
      setAllDates(temperature.map((t) => t.date))
      setActualTemperature(temperature[temperature.length - 1].value)
      setIdealTemperature
    })    
    temperature.fetchIdealTemperature().then((data) => {
      setIdealTemperature(data)
    })

  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      parseInt(actualTemperature) < parseInt(idealTemperature) ? calentadorPower() : disipadorPower()
    }, 1000)
    return () => clearInterval(interval)
  }, [idealTemperature, actualTemperature])

  const [calentador, setCalentador] = useState(0)
  const [disipador, setDisipador] = useState(0)

  const handleIdealTemperature = (e) => {
    setIdealTemperature(e.target.value)
    parseInt(actualTemperature) < parseInt(idealTemperature) ? calentadorPower() : disipadorPower()
    updateIdealTemperature(e.target.value)
  }

  const updateIdealTemperature = async (value) => {
    await temperature.postIdealTemperature(value)
  }

  const calentadorPower = () => {
    setDisipador(0)
    const error = idealTemperature - actualTemperature
    const kP = 0.5
    const kI = 1
    const kD = 1
    const dt = 1
    const P = kP * error
    const I = kI * error * dt
    const D = kD * error / dt
    const power = P + I + D
    setCalentador(power.toFixed(2))
    temperature.postCalentador(power.toFixed(2))
  }

  const disipadorPower = () => {
    setCalentador(0)
    const error = actualTemperature - idealTemperature  
    const kP = 0.5
    const kI = 1
    const kD = 1
    const dt = 1
    const P = kP * error
    const I = kI * error * dt
    const D = kD * error / dt
    const power = P + I + D
    setDisipador(power.toFixed(2))
    temperature.postVentilador(power.toFixed(2))
  }

  const data = {
    labels: allDates,
    datasets: [
      {
        label: 'Temperatura',
        data: allTemperature,
        borderColor: 'white',
        backgroundColor: '#26A69A',
        tension: 0.5,
        fill: true,
        pointBorderWidth: 10
      },
    ],
  };

  return (
    <>
      <h2>Temperatura</h2>
      <p>Visualización y control de temperatura</p>
      <hr/>
      <div className='container'> 
        <div className="graph__container">
          <Line classname='graph' options={options} data={data} />
        </div>
        <div className='actual__temperature'>
          <div>Temperatura Actual</div>
          <span id="rangeValue">{actualTemperature}°C</span>
          <button>Obtener Temperatura</button>
        </div>
      </div>      
      <br/>
      <div className='box'>
        <div className='slider'>
          <h3>Temperatura Ideal</h3>
          <span id="rangeValue">{idealTemperature}°C</span>
          <input type="range" min="0" max="50" value={idealTemperature} onChange={(e) => handleIdealTemperature(e)} className="range blue" />
        </div>
        <div className='calentador'>
          <h3>Calentador</h3>
          <div className='switch'>{calentador}%</div>
        </div>
        <div className='disipador'>
          <h3>Disipador</h3>
          <div className='switch'>{disipador}%</div>
        </div>
      </div>      
    </>
  )
}