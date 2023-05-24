const URL_ENDPOINT = 'https://greenhouse-backend.vercel.app/'

const fetchTemperature = async () => {
  const response = await fetch(URL_ENDPOINT + 'api/temperature')
  const temperature = await response.json()
  return temperature.slice(-10)
}

const fetchIdealTemperature = async () => {
  const response = await fetch(URL_ENDPOINT + 'api/temperature/ideal')
  const temperature = await response.json()
  return temperature.value
}

const postIdealTemperature = async (idealTemperature) => {
  await fetch(URL_ENDPOINT + 'api/temperature/ideal', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ "value": idealTemperature })
  })
}

export default { fetchTemperature, fetchIdealTemperature, postIdealTemperature }