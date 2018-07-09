import React from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom'
import CurrentUser from './components/CurrentUser'
import UserList from './components/UserList'
import User from './components/User'
import Blog from './components/Blog'
import BlogList from './components/BlogList'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import { initUsers } from './reducers/userReducer'
import { setToken } from './reducers/blogReducer'
import { notify } from './reducers/notificationReducer'
import { initAuth } from './reducers/authReducer'
import PropTypes from "prop-types";

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
  return (
    <div>
      <h1>A blog</h1>
      <div className="container">
        <div className="row">
          <div className="col">
            {JSON.stringify(props)}
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

class App extends React.Component {

  blogById = (id) =>
    this.props.blogs.find(a => a.id === id)

  userById = (id) => {
    const user = this.props.users.find(a => a.id === id)
    console.log(user)
    return user
  }

  componentDidMount() {
    try {
      this.props.initAuth()
      if (this.props.currentuser)
        this.props.setToken(this.props.currentuser.token)
      console.log('mounted')
    } catch (exception) {
      console.log(exception)
      this.props.notify(`Something went wrong ...`, 5, 'ERROR')
    }
  }

  render() {

    const Body = (props) => {

      if (!props.currentuser)
        return null

      return (
        <div>
          <Menu />
          <Route exact path="/" render={() => <HomeView />} />
          <Route exact path="/blogs" render={() => <BlogsView />} />
          <Route exact path="/blogs/:id" render={({match}) =>
            <Blog id={match.params.id} />}
          />
          <Route exact path="/users" render={() => <UsersView />} />
          <Route exact path="/users/:id" render={({match}) =>
            <User id={match.params.id} users={this.props.users} />}
          />
        </div>
      )
    }

    return (
      <div>
        <Router>
          <div>
            <Header />
            <Notification />
            <Body currentuser={this.props.currentuser}
                  users={this.props.users}
                  blogs={this.props.blogs}/>
          </div>
        </Router>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentuser: state.currentuser || JSON.parse(localStorage.getItem('currentuser')),
    users: state.users,
    blogs: state.blogs
  }
}

App.contextTypes = {
  store: PropTypes.object
}

export default connect(
  mapStateToProps,
  { initUsers, initAuth, notify, setToken }
)(App)


















