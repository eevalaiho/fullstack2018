import React from 'react'
import {  Route, Link, Redirect, withRouter } from 'react-router-dom'

class Menu extends React.Component {
  render() {
    const {location} = this.props
    console.log(location)
    return (
      <nav className='top'>
        <Link to="/" className={location.pathname === '/' ? 'active' : ''}>anecdotes</Link>
        <Link to="/create" className={location.pathname === '/create' ? 'active' : ''}>create new</Link>
        <Link to="/about" className={location.pathname === '/about' ? 'active' : ''}>about</Link>
      </nav>
    )
  }
}
export default withRouter(Menu)