const notificationReducer = (store = '', action) => {
  //console.log(action)
  switch (action.type) {
    case 'INFO':
      return action.message
    case 'ERROR':
      return action.message
    default:
  }
  return store
}

export const notify = (message,seconds,type) => {
  return async (dispatch) => {
    dispatch({
      type: type ? type : 'INFO',
      message
    })
    setTimeout(() => {
      dispatch({
        type: type ? type : 'INFO',
        message: null
      })
    }, seconds*1000)
  }
}

export default notificationReducer