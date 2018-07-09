import React from 'react'
import { connect } from 'react-redux'
import {initUsers} from "../reducers/userReducer";

class User extends React.Component {

  componentDidMount() {
    try {
      this.props.initUsers()
    } catch (exception) {
      console.log(exception)
      this.props.notify(`Something went wrong ...`, 5, 'ERROR')
    }
  }

  render() {
    const {user} = this.props
    return (
      <div>
        <h1>{user && user['name']}</h1>
        <div className="row">
          <div className="col">
            Username: {user && user.username}<br />
            Adult: {user && user.adult.toString()}<br />
          </div>
        </div>
        <h2>Added blogs</h2>
        <ul>{user && user.blogs.map(b =>
          <li key={b._id}>{b.title} by {b.author} <br />
            <a href={b.url}>{b.url}</a><br />
            Likes: {b.likes}
          </li>
        )}</ul>
      </div>
    )}
}

const mapStateToProps = (state,props) => {
  return {
    user: state.users.find(u => u._id === props.id),
  }
}

export default connect(
  mapStateToProps,
  {initUsers}
)(User)