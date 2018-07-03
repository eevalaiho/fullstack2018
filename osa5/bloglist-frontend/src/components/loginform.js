import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = (props) => {
  const { handleSubmit, handleChange, username, password } = props
  return (
    <div>
      <h2>Log in</h2>
      <form onSubmit={handleSubmit}>
        <div>
          Username
          <input
            value={username}
            onChange={handleChange}
            name="login_username"
          />
        </div>
        <div>
          Password
          <input
            type="password"
            name="login_password"
            value={password}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Log in</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default LoginForm
