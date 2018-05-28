import axios from 'axios'
const baseUrl = 'https://restcountries.eu/rest/v2'

const getAll = () => {
    return axios.get(`${baseUrl}/all`)
}

const get = (name) => {
    return axios.get(`${baseUrl}/name/${name}`)
}

export default { getAll, get }
