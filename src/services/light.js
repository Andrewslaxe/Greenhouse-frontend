const URL_ENDPOINT = 'https://greenhouse-backend.vercel.app/'

export const fetchLight = async () => {
  const response = await fetch(URL_ENDPOINT + 'api/light')
  const light = await response.json()
  return light.slice(-10)
}

export const fetchIdealLight = async () => {
  const response = await fetch(URL_ENDPOINT + 'api/light/ideal')
  const light = await response.json()
  return light.value
}

export const postIdealLight = async (idealLight) => {
  await fetch(URL_ENDPOINT + 'api/light/ideal', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ "value": idealLight })
  })
}

export default {
  fetchLight,
  fetchIdealLight,
  postIdealLight
}