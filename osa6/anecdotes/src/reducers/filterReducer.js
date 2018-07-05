const filterReducer = (store = '', action) => {
  switch (action.type) {
    case 'FILTER':
      return action.data.text
    default:
  }
  return store
}

export const addFilter = (text) => {
  return {
    type: 'FILTER',
    data: {
      text
    }
  }
}

export const removeFilter = (text) => {
  return {
    type: 'FILTER',
    data: null
  }
}

export default filterReducer