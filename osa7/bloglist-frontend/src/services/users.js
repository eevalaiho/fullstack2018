import axios from 'axios'
const baseUrl = '/api/users'

let token = null

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

/*
const setToken = (newToken) => {
  token = `bearer ${newToken}`
}
*/

const create = async (newObject) => {
  const config = {
    headers: { 'Authorization': token }
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = (newObject) => {
  const config = {
    headers: { 'Authorization': token }
  }
  const id = newObject._id
  const request = axios.put(`${baseUrl}/${id}`, newObject, config)
  return request.then(response => response.data)
}

const _delete = (id) => {
  const config = {
    headers: { 'Authorization': token }
  }
  return axios.delete(`${baseUrl}/${id}`, config)
}

export default { getAll, create, update, _delete }