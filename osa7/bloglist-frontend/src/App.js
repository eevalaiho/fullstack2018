import React from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Link, NavLink, Redirect } from 'react-router-dom'
import User from './components/CurrentUser'
import UserList from './components/UserList'
import BlogList from './components/BlogList'
import BlogForm from './components/BlogForm'
import CurrentUser from './components/CurrentUser'
import Notification from './components/Notification'
import { initUsers } from './reducers/userReducer'
import { initBlogs, setToken } from './reducers/blogReducer'
import { notify } from './reducers/notificationReducer'
import { initAuth } from './reducers/authReducer'

const UserView = (props) => {
  const {id} = props
  return (
    <div>
      <h1>A user</h1>
      <div className="container">
        <div className="row">
          <div className="col">
            <User id={id} />
          </div>
        </div>
      </div>
    </div>
  )
}

const UsersView = () => {
  return (
    <div>
      <h1>Users</h1>
      <div className="container">
        <div className="row">
          <div className="col">
            <UserList />
          </div>
        </div>
      </div>
    </div>
  )
}

const BlogView = (props) => {
  const {id} = props
  return (
    <div>
      <h1>A blog</h1>
      <div className="container">
        <div className="row">
          <div className="col">
            <p>A blog's content</p>
          </div>
        </div>
      </div>
    </div>
  )
}

const BlogsView = () => {
  return (
    <div>
      <h1>Blogs</h1>
      <div className="container">
        <div className="row">
          <div>
            <BlogList />
            <BlogForm />
          </div>
        </div>
      </div>
    </div>
  )
}

const HomeView = () => (
  <div>
    <h1>Home</h1>
    <div className="container">
      <div className="row">
        <div className="col">
          <p>The blogs app home view</p>
        </div>
      </div>
    </div>
  </div>
)

const Header = () => (
  <div>
    <div>
      <div style={{font: 'bold 30px sans-serif'}}>This is the blogs app</div>
      <CurrentUser />
    </div>
  </div>
)


const Menu = () => {
  return (
    <nav className='top'>
      <NavLink exact to="/"><span className="glyphicon glyphicon-home">Home</span></NavLink>&nbsp;
      <NavLink to="/blogs">Blogs</NavLink>&nbsp;
      <NavLink exact to="/users">Users</NavLink>
    </nav>
  )
}

const Body = (props) => {
  if (!props.currentuser)
    return null
  return (
    <div>
      <Menu />
      <Route exact path="/" render={() => <HomeView />} />
      <Route exact path="/blogs" render={() => <BlogsView />} />
      <Route exact path="/blogs/:id" render={({match}) =>
        <User blog={this.blogById(match.params.id)} />}
      />
      <Route exact path="/users" render={() => <UsersView />} />
      <Route exact path="/users/:id" render={({match}) =>
        <User user={this.userById(match.params.id)} />}
      />
    </div>
  )
}
class App extends React.Component {

  componentDidMount() {
    try {
      this.props.initAuth()
      if (this.props.currentuser)
        this.props.setToken(this.props.currentuser.token)
    } catch (exception) {
      console.log(exception)
      this.props.notify(`Something went wrong ...`, 5, 'ERROR')
    }
  }

  userById = (id) =>
    this.state.users.find(a => a.id === id)

  blogById = (id) =>
    this.state.blogs.find(a => a.id === id)


  render() {
    //console.log(this.props.currentuser)
    return (
      <div>
        <Router>
          <div>
            <Header />
            <Notification />
            <Body currentuser={this.props.currentuser}/>
          </div>
        </Router>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  //console.log('App.state', state)
  return {
    currentuser: state.currentuser || JSON.parse(localStorage.getItem('currentuser')),
  }
}

export default connect(
  mapStateToProps,
  { initUsers, initAuth, notify, setToken }
)(App)
