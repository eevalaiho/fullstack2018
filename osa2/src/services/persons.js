import axios from 'axios'
//const baseUrl = 'https://fstck-puhelinluettelo.herokuapp.com/api/persons'
//const baseUrl = 'http://localhost:3001/api/persons'
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
    return axios.put(`${baseUrl}/${id}`, newObject)
}

const remove = (id) => {
    return axios.delete(`${baseUrl}/${id}`, id)
}

export default { get, getAll, create, update, remove }
