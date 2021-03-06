import React from 'react'
import Blog from './components/blog'
import Notification from './components/notification'
import LoginForm from './components/loginform'
import Togglable from './components/togglable'
import loginService from './services/login'
import blogService from './services/blogs'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      user: '',
      login_password: '',
      login_username: '',
      blog_title: '',
      blog_author: '',
      blog_url: '',
      login_visible: false,
      info: '',
      error: ''
    }
  }

  componentDidMount() {
    try {
      const user_str = localStorage.getItem('current_user')
      if (user_str) {
        blogService.getAll().then(blogs =>
          this.setState({blogs})
        )
        const user = JSON.parse(user_str)
        this.setState({user: user})
        blogService.setToken(user.token)
      }
    } catch (exception) {
      console.log('Something went wrong ...', exception.message)
    }
  }

  logout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('current_user')
    this.setState({
      user: null,
      info: 'User logged out'
    })
    setTimeout(() => {
      this.setState({ info: null })
    }, 5000)
  }

  login = async (event) => {
    event.preventDefault()
    try{
      const user = await loginService.login({
        username: this.state.login_username,
        password: this.state.login_password,
      })
      window.localStorage.setItem('current_user', JSON.stringify(user))
      this.setState({
        login_username:'', login_password:''
      })
    } catch(exception) {
      this.setState({
        error: 'Invalid username or password',
      })
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000)
    }
    this.componentDidMount()
  }

  createBlog = async (event) => {
    event.preventDefault()
    try{
      const blog = {
        title: this.state.blog_title,
        author: this.state.blog_author,
        url: this.state.blog_url
      }
      await blogService
        .create(blog)
        .then(
          () => {
            this.setState({
              blog_title:'', blog_author:'', blog_url: ''
            })
            this.componentDidMount()
          }
        )
      this.setState({
        info: 'A new blog entry \''+blog.title+'\' was entered'
      })
      setTimeout(() => {
        this.setState({ info: null })
      }, 5000)
    } catch(exception) {
      this.setState({
        error: 'Something went wrong ...',
      })
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000)
    }
  }

  handleLoginFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleBlogFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleLikeClick = async (blog) => {
    return await blogService
      .like(blog._id)
      .then(response => {
        const updatedBlog = blog
        updatedBlog.likes = response.likes
        this.setState({
          blogs: this.state.blogs
            .filter(b => !(b._id === blog._id))
            .concat(updatedBlog)
            .sort((a,b) => a.likes > b.likes)
        })
        return updatedBlog
      })
  }

  handleDeleteClick = async (blog) => {
    if (window.confirm('Really delete \'' + blog.title +'\' by ' + blog.author + '?')) {
      await blogService
        ._delete(blog._id)
        .then(() => {
          this.setState({
            blogs: this.state.blogs
              .filter(b => !(b._id === blog._id))
          })
        })
    }
  }

  render() {

    const loginForm = () => {
      return (
        <Togglable buttonLabel="Log in" >
          <LoginForm
            username={this.state.login_username}
            password={this.state.login_password}
            handleChange={this.handleLoginFieldChange}
            handleSubmit={this.login}
          />
        </Togglable>
      )
    }

    const blogForm = () => (
      <div>
        <h2>Create a blog</h2>
        <form onSubmit={this.createBlog} method="post">
          <div>
            <label>Title:</label>
            <input value={this.state.blog_title} name="blog_title" onChange={this.handleBlogFieldChange} />
          </div>
          <div>
            <label>Author:</label>
            <input value={this.state.blog_author} name="blog_author" onChange={this.handleBlogFieldChange} />
          </div>
          <div>
            <label>Url:</label>
            <input value={this.state.blog_url} name="blog_url" onChange={this.handleBlogFieldChange} />
          </div>
          <button type="submit">Add</button>
        </form>
      </div>
    )

    const blogList = (user) => (
      <div>
        <h2>Blog list</h2>
        <div>
          { this.state.blogs
            .sort((a, b) => b.likes > a.likes)
            .map(blog => <Blog key={blog._id} blog={blog} user={user}
                               onLikeClick={this.handleLikeClick}
                               onDeleteClick={this.handleDeleteClick} /> )
          }
        </div>
      </div>
    )

    return (
      <div>
        <h1>Blogs</h1>
        <Notification message={this.state.error} className='error' />
        <Notification message={this.state.info}  className='message' />
        { !this.state.user
          ? loginForm()
          : <div>
              <p>{ this.state.user.name } logged in <button onClick={this.logout}>Logout</button></p>
              <div>{ blogList(this.state.user) }</div>
              <div>{ blogForm() }</div>
            </div>
        }
      </div>
    )
  }
}

export default App