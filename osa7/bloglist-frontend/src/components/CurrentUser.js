import React from 'react'
import { connect } from 'react-redux'
import LoginForm from './LoginForm'
import { notify } from '../reducers/notificationReducer'
import {logout} from '../reducers/authReducer'

const User = (props) => {
  const handleLogout = async (e) => {
    e.preventDefault()
    props.logout()
    props.notify(`User logged out`, 5)

  }

  const user = props.currentuser //|| JSON.parse(localStorage.getItem('user'))

  return (
      user
      ? <p>{user.name} logged in <button onClick={(e) => handleLogout(e)}>Logout</button></p>
      : <LoginForm />
  )
}

const mapStateToProps = (state) => {
  return {
    currentuser: state.currentuser || JSON.parse(localStorage.getItem('currentuser'))
  }
}

export default connect(
  mapStateToProps,
  { logout, notify }
)(User)