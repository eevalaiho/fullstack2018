import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => {
    return axios.get(baseUrl)
}

const get = (id) => {
    return axios.get(`${baseUrl}/${id}`)
}

const create = (newObject) => {
    return axios.post(baseUrl, newObject)
}

const update = (id, newObject) => {
    const result = axios.put(`${baseUrl}/${id}`, newObject)
    return result
}

const remove = (id) => {
    return axios.delete(`${baseUrl}/${id}`, id)
}

export default { get, getAll, create, update, remove }
