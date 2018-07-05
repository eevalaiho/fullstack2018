const notificationReducer = (store = '', action) => {
  //console.log(action)
  switch (action.type) {
    case 'NOTIFY':
      return action.message
    default:
  }
  return store
}
/*
const addNotification = (message) => {
  return {
    type: 'NOTIFY',
    data: {
      message: message
    }
  }
}

const removeNotification = () => {
  return {
    type: 'NOTIFY',
    data: {
      message: null
    }
  }
}
*/
export const notify = (message,seconds) => {
  return async (dispatch) => {
    dispatch({
      type: 'NOTIFY',
      message
    })
    setTimeout(() => {
      dispatch({
        type: 'NOTIFY',
        message: null
      })
    }, seconds*1000)
  }
}

export default notificationReducer