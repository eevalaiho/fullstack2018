import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

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

const like = (id) => {
  const config = {
    headers: { 'Authorization': token }
  }
  const request = axios.put(`${baseUrl}/${id}/like`, null, config)
  return request.then(response => response.data)
}

export default { getAll, setToken, create, update, like, _delete }