import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { initUsers } from "../reducers/userReducer";

const User = (props) => {
  const {user} = props
  return (
    <div className="wrapper" ref={this.ref}>
      <div>
        <h2><NavLink exact to={'/users/'+user._id}>{user.name}</NavLink></h2>
        <div>
          Username: {user.username}<br />
          Blogs: {user.blogs ? user.blogs.length : 0}
        </div>
      </div>
    </div>
  )
}

class UserList extends React.Component {

  componentDidMount() {
    try {
      this.props.initUsers()
    } catch (exception) {
      console.log(exception)
      this.props.notify(`Something went wrong ...`, 5, 'ERROR')
    }
  }

  render() {
    return (
      <div>
        <ul>
          {this.props.usersToShow.map(user =>
            <li key={user._id} >
              <User key={user._id} user={user}/>
            </li>)
          }
        </ul>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    usersToShow: state.users
  }
}

export default connect(
  mapStateToProps,
  {initUsers}
)(UserList)
