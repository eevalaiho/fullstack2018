import blogService from '../services/blogs'

const blogReducer = (blogs = [], action) => {
  switch (action.type) {
    case 'INIT':
      return action.data
    case 'CREATE':
      return [...blogs, action.data]
    case 'MODIFY':
    case 'LIKE':
      const old = blogs.filter(a => a._id !== action.data._id)
      return [...old, action.data ]
    case 'DELETE':
      return blogs.filter(a => a._id !== action.data._id)
    default:
  }
  return blogs
}

export const initBlogs = () => {
  return async (dispatch) => {
    const response = await blogService.getAll()
    //console.log('initBlogs:', response)
    dispatch({
      type: 'INIT',
      data: response
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
    await blogService._delete(blog._id)
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