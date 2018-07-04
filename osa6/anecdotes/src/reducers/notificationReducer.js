const notificationReducer = (store = '', action) => {
  //console.log(action)
  switch (action.type) {
    case 'NOTIFY':
      return action.data.message
    default:
  }
  return store
}

export const addNotification = (message) => {
  return {
    type: 'NOTIFY',
    data: {
      message: message
    }
  }
}

export const removeNotification = () => {
  return {
    type: 'NOTIFY',
    data: {
      message: null
    }
  }
}

export default notificationReducer