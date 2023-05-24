import { useEffect, useState } from 'react'

import temperature from './services/temperature'
import './slider.css'
import {Chart} from './Chart'

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

  const handleIdealTemperature = (e) => {
    setIdealTemperature(e.target.value)
    updateIdealTemperature(e.target.value)
  }

  const updateIdealTemperature = async (value) => {
    await temperature.postIdealTemperature(value)
  }

  return (
    <>
      <h2>Temperatura</h2>
      <p>Visualización y control de temperatura</p>
      <hr/>
      <div className='container'> 
        <div className="graph__container">
          <Chart allDates={allDates} allData={allTemperature} />
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
          <div className='switch'>5%</div>
        </div>
        <div className='disipador'>
          <h3>Disipador</h3>
          <div className='switch'>2%</div>
        </div>
      </div>      
    </>
  )
}