import React from 'react'
import PropTypes from 'prop-types'

const Notification = (props) => {
  const {message, className} = props
  if (message === null || message.length === 0) {
    return null
  }
  return (
    <div className={className}>
      {message}
    </div>
  )
}

Notification.propTypes = {
  message: PropTypes.string,
  className: PropTypes.string.isRequired
}

export default Notification
