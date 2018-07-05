import anecdoteService from '../services/anecdotes'

const anecdoteReducer = (store = [], action) => {
  //console.log(action)
  switch (action.type) {
    case 'CREATE':
      return [...store, action.data]
    case 'INIT':
      return action.data
    case 'MODIFY':
      //console.log(action.data)
      const old = store.filter(a => a.id !== action.data.id)
      return [...old, action.data ]
    default:
  }
  return store
}

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const response = await anecdoteService.create(content)
    dispatch({
      type: 'CREATE',
      data: response
    })
  }
}

export const modifyAnecdote = (anecdote) => {
  return async (dispatch) => {
    await anecdoteService.update(anecdote)
    dispatch({
      type: 'MODIFY',
      data: anecdote
    })
  }
}

export const initAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT',
      data: anecdotes
    })
  }
}

export default anecdoteReducer