import loginService from '../services/login'

const authReducer = (user = null, action) => {
  switch (action.type) {
    case 'AUTH_SET_USER':
      return action.user
    default:
  }
  return null
}

export const initAuth = () => {
  return async (dispatch) => {
    const user = await JSON.parse(localStorage.getItem('currentuser'))
    if (user) {
      dispatch({
        type: 'AUTH_SET_USER',
        user
      })
    }
  }
}

export const login = (username, password) => {
  return async (dispatch) => {
    await loginService.login({ username, password })
      .then((response) => {
        console.log('response',response)
        const userStr = JSON.stringify(response)
        console.log('userStr',userStr)
        localStorage.setItem('currentuser', userStr)
        dispatch({
          type: 'AUTH_SET_USER',
          user: userStr
        })
      })
  }
}

export const logout = () => {
  return async (dispatch) => {
    localStorage.removeItem('currentuser')
    dispatch({
      type: 'AUTH_SET_USER',
      user: null
    })
  }
}

export default authReducer