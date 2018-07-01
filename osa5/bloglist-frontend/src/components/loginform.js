import React from 'react'

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
            name="username"
          />
        </div>
        <div>
          Password
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Log in</button>
      </form>
    </div>
  )
}

export default LoginForm
