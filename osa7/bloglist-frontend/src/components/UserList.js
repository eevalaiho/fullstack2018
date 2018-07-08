import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import User from './User'
import {initUsers} from "../reducers/userReducer";

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
    const props = this.props
    console.log('blogsToShow:', props.blogsToShow)

    return (
      <div>
        <h2>User list</h2>
        <div>
          {props.usersToShow.map(user =>
            <User key={user._id} user={user}/>)
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    usersToShow: state.users
  }
}

UserList.contextTypes = {
  store: PropTypes.object
}

export default connect(
  mapStateToProps,
  {initUsers}
)(UserList)
