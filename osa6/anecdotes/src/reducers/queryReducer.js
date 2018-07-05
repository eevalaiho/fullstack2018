const queryReducer = (store = '', action) => {
  //console.log(action)
  switch (action.type) {
    case 'QUERY':
      return action.data.text
    default:
  }
  return store
}

export const addQuery = (text) => {
  return {
    type: 'QUERY',
    data: {
      text
    }
  }
}

export const removeQuery = (text) => {
  return {
    type: 'QUERY',
    data: null
  }
}

export default queryReducer