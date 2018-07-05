

const anecdoteReducer = (store = [], action) => {
  //console.log(action)
  switch (action.type) {
    case 'CREATE':
      return [...store, action.data]
    case 'INIT':
      return action.data
    case 'MODIFY':
      console.log(action.data)
      const old = store.filter(a => a.id !== action.data.id)
      //const modified = store.find(a => a.id === action.data.id)
      return [...old, action.data ]
    /*case 'VOTE':
      const old = store.filter(a => a.id !==action.data.id)
      const voted = store.find(a => a.id === action.data.id)
      return [...old, { ...voted, votes: voted.votes+1} ]*/
    default:
  }
  return store
}

export const createAnecdote = (data) => {
  return {
    type: 'CREATE',
    data
  }
}

export const modifyAnecdote = (data) => {
  return {
    type: 'MODIFY',
    data
  }
}


export const initAnecdotes = (data) => {
  return {
    type: 'INIT',
    data
  }
}

export default anecdoteReducer