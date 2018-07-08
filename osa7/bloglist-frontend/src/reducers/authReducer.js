import loginService from '../services/login'

const authReducer = (user = null, action) => {
  //console.log(action)
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
    //console.log('initUser', user)
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
    await loginService
      .login({ username, password })
      .then((response) => {
        const user = JSON.stringify(response)
        //console.log('login',user)
        localStorage.setItem('currentuser', user)
        dispatch({
          type: 'AUTH_SET_USER',
          user
        })
      })
  }
}

export const logout = () => {
  return async (dispatch) => {
    //console.log('logout')
    localStorage.removeItem('currentuser')
    dispatch({
      type: 'AUTH_SET_USER',
      user: null
    })
  }
}

export default authReducer