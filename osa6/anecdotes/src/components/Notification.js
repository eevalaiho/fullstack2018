import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const Notification = (props) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  const {notification} = props
  if (notification)
    return ( <div style={style}>{notification}</div> )
  return null
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

Notification.contextTypes = {
  store: PropTypes.object
}

export default connect(
  mapStateToProps
)(Notification)