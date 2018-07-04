import React from 'react'
import PropTypes from 'prop-types'

class Notification extends React.Component {
  render() {
    const style = {
      border: 'solid',
      padding: 10,
      borderWidth: 1
    }
    const notification = this.context.store.getState().notification
    //console.log(notification)
    if (notification)
      return ( <div style={style}>{notification}</div> )
    return null
  }
}

Notification.contextTypes = {
  store: PropTypes.object
}

export default Notification