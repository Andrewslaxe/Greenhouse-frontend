import { useEffect, useState } from 'react'

import './slider.css'
import { Chart } from './Chart'
import light from './services/light'

export function Light(){
  const [allLight, setAllLight] = useState([])
  const [allDates, setAllDates] = useState([])
  const [actualLight, setActualLight] = useState(0)
  const [idealLight, setIdealLight] = useState(0)

  useEffect(() => {
    light.fetchLight().then((light) => {
      setAllLight(light.map((l) => parseFloat(l.value)) )
      setAllDates(light.map((l) => l.date))
      setActualLight(light[light.length - 1].value)
      setIdealLight
    })    
    light.fetchIdealLight().then((data) => {
      setIdealLight(data)
    })

  }
  , [])

  const handleIdealLight = (e) => {
    setIdealLight(e.target.value)
    updateIdealLight(e.target.value)
  }

  const updateIdealLight = async (value) => {
    await light.postIdealLight(value)
  }

  return (
    <>
      <h2>Luz</h2>
      <p>Visualización y control de luz</p>
      <hr/>
      <div className='container'>
        <div className="graph__container">
          <Chart allDates={allDates} allData={allLight} />
        </div>
        <div className='actual__light'>
          <div>Luz Actual</div>
          <span id="rangeValue">{actualLight}%</span>
          <button>Obtener Luz</button>
        </div>
      </div>
      <br/>
      <div className='box'>
        <div className='slider'>
          <h3>Luz Ideal</h3>
          <span id="rangeValue">{idealLight}%</span>
          <input type="range" min="0" max="100" value={idealLight} onChange={(e) => handleIdealLight(e)} className="range blue" />
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
