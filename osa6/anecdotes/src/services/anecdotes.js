import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getId = () => (100000*Math.random()).toFixed(0)

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (content) => {
  const data = {
    id: getId(),
    content
    , votes: 0}
  const response = await axios.post(baseUrl, data)
  return response.data
}

const update = async (anecdote) => {
  const response = await axios.put(`${baseUrl}/${anecdote.id}`,anecdote)
  return response
}

export default { getAll, create, update }