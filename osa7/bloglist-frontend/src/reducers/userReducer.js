//import {userService as svc} from '../services/users'
import userService from '../services/users'

const userReducer = (users = [], action) => {
  switch (action.type) {
    case 'INIT':
      return action.data
    case 'CREATE':
      return [...users, action.data]
    case 'MODIFY':
    case 'LIKE':
      const old = users.filter(a => a._id !== action.data._id)
      return [...old, action.data ]
    case 'DELETE':
      return users.filter(a => a._id !== action.data._id)
    default:
  }
  return users
}

export const initUsers = () => {
  return async (dispatch) => {
    const response = await userService.getAll()
    //console.log('initUsers:', response)
    dispatch({
      type: 'INIT',
      data: response
    })
  }
}

export const createUser = (obj) => {
  return async (dispatch) => {
    const response = await userService.create(obj)
    dispatch({
      type: 'CREATE',
      data: response
    })
  }
}

export const modifyUser = (obj) => {
  return async (dispatch) => {
    const response = await userService.update(obj)
    dispatch({
      type: 'MODIFY',
      data: response
    })
  }
}

export const deleteUser = (obj) => {
  return async (dispatch) => {
    await userService._delete(obj._id)
    dispatch({
      type: 'DELETE',
      data: obj
    })
  }
}

export default userReducer