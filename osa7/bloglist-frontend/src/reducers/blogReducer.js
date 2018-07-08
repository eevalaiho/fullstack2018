import blogService from '../services/blogs'

const blogReducer = (store = [], action) => {
  switch (action.type) {
    case 'INIT':
      return action.data
    case 'CREATE':
      return [...store, action.data]
    case 'MODIFY':
    case 'LIKE':
      const old = store.filter(a => a._id !== action.data._id)
      return [...old, action.data ]
    case 'DELETE':
      return store.filter(a => a._id !== action.data._id)
    default:
  }
  return store
}

export const initBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT',
      data: blogs
    })
  }
}

export const createBlog = (blog) => {
  return async (dispatch) => {
    const response = await blogService.create(blog)
    dispatch({
      type: 'CREATE',
      data: response
    })
  }
}

export const likeBlog = (blog) => {
  return async (dispatch) => {
    const response = await blogService.like(blog._id)
    dispatch({
      type: 'LIKE',
      data: response
    })
  }
}


export const modifyBlog = (blog) => {
  return async (dispatch) => {
    await blogService.update(blog)
    dispatch({
      type: 'MODIFY',
      data: blog
    })
  }
}

export const deleteBlog = (blog) => {
  return async (dispatch) => {
    const response = await blogService._delete(blog._id)
    dispatch({
      type: 'DELETE',
      data: blog
    })
  }
}
export const setToken = (token) => {
  return async (dispatch) => {
    await blogService.setToken(token)
  }
}

export default blogReducer