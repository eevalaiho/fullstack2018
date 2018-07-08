import React from 'react'
import { connect } from 'react-redux'
import BlogList from './components/BlogList'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import User from './components/User'
import { initBlogs, setToken } from './reducers/blogReducer'
import { notify } from './reducers/notificationReducer'
import { initUser } from './reducers/authReducer'

class App extends React.Component {

  componentDidMount() {
    try {
      this.props.initBlogs()
      this.props.initUser()
      if (this.props.user)
        this.props.setToken(this.props.user.token)
    } catch (exception) {
      console.log(exception)
      this.props.notify(`Something went wrong ...`, 5, 'ERROR')
    }
  }

  render() {
    console.log(this.props.user)
    return (
      <div>
        <h1>Blogs</h1>
        <Notification />
        <User />
        {this.props.user !== null &&
          <div>
            <BlogList />
            <BlogForm />
          </div>
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  //console.log('App.state', state)
  return {
    user: state.user || JSON.parse(localStorage.getItem('user'))
  }
}

export default connect(
  mapStateToProps,
  { initBlogs, initUser, notify, setToken }
)(App)
