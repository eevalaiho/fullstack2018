import React from 'react'
import PropTypes from "prop-types";

const User = (props) => {

  const {user} = props

  return (
    <div className="wrapper" ref={this.ref}>
      <div>
        <h2>{user.name}</h2>
        <div>
          Username: {user.username}
        </div>
      </div>
    </div>
  )
}

User.propTypes = {
  user: PropTypes.object.isRequired
}

export default User