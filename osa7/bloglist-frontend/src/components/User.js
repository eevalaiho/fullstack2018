import React from 'react'
import { connect } from 'react-redux'
import LoginForm from './LoginForm'
import { notify } from '../reducers/notificationReducer'
import {logout} from '../reducers/authReducer'
import PropTypes from "prop-types";

const User = (props) => {
  const handleLogout = async (e) => {
    e.preventDefault()
    console.log('logout')
    props.logout()
    props.notify(`User logged out`, 5)

  }

  const user = props.user //|| JSON.parse(localStorage.getItem('user'))

  return (
      user
      ? <p>{user.name} logged in <button onClick={(e) => handleLogout(e)}>Logout</button></p>
      : <LoginForm />
  )
}

const mapStateToProps = (state) => {
  //console.log('App.state', state)
  return {
    user: state.user || JSON.parse(localStorage.getItem('user'))
  }
}

export default connect(
  mapStateToProps,
  { logout, notify }
)(User)