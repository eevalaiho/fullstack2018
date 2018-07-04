const notificationReducer = (store = '', action) => {
  console.log(action)
  switch (action.type) {
    case 'NOTIFY':
      return action.data.message
    default:
  }
  return store
}

export const notify = (message) => {
  return {
    type: 'NOTIFY',
    data: {
      message: message
    }
  }
}

export default notificationReducer