import React from 'react'
import { connect } from 'react-redux'
import { login } from './../reducers/authReducer'
import { notify } from './../reducers/notificationReducer'

class LoginForm extends React.Component {

  handleLogin = async (e) => {
    e.preventDefault()
    this.props.login(e.target.username.value,e.target.password.value)
    e.target.username.value = e.target.password.value = ''
  }

  render() {
    return (
      <div>
        <h2>Log in</h2>
        <form onSubmit={this.handleLogin}>
          <div>
            Username
            <input name="username" />
          </div>
          <div>
            Password
            <input type="password" name="password" />
          </div>
          <button type="submit">Log in</button>
        </form>
      </div>
  )}
}

export default connect(
  null,
  { login, notify }
)(LoginForm)
