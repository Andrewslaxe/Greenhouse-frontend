const URL_ENDPOINT = 'https://greenhouse-backend.vercel.app/'

const fetchTemperature = async () => {
  const response = await fetch(URL_ENDPOINT + 'api/temperature')
  const temperature = await response.json()
  return temperature
}

const fetchIdealTemperature = async () => {
  const response = await fetch(URL_ENDPOINT + '/api/temperature/ideal')
  const temperature = await response.json()
  return temperature.value
}

const postIdealTemperature = async (idealTemperature) => {
  await fetch(URL_ENDPOINT + '/api/temperature/ideal', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ "value": idealTemperature })
  })
}

const postCalentador = async (calentador) => {
  await fetch(URL_ENDPOINT + '/api/calentador', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ "value": calentador })
  })
}

const postVentilador = async (ventilador) => {
  await fetch(URL_ENDPOINT + '/api/ventilador', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ "value": ventilador })
  })
}

export default { postCalentador, postVentilador, fetchTemperature, fetchIdealTemperature, postIdealTemperature }