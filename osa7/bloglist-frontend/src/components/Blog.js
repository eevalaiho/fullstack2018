import React from 'react'
import { connect } from 'react-redux'
import {deleteBlog, likeBlog, initBlogs} from '../reducers/blogReducer'
import {notify} from '../reducers/notificationReducer'

class Blog extends React.Component {

  componentDidMount() {
    try {
      this.props.initBlogs()
    } catch (exception) {
      console.log(exception)
      this.props.notify(`Something went wrong ...`, 5, 'ERROR')
    }
  }

  render() {

    const {blog, user} = this.props

    const handleLike = async () => {
      this.props.likeBlog(blog)
    }

    const handleDelete = async () => {
      if (window.confirm(`Really delete '${blog.title}' by '${blog.author}'?`)) {
        this.props.deleteBlog(blog)
        this.props.notify(`Blog '${blog.title}' by '${blog.author}' was deleted`, 5)
      }
    }

    const DeleteButton = () => {
      if (!user || (blog && blog.user && blog.user._id !== user._id))
        return null
      return (
        <button onClick={() => handleDelete()} className="button delete">Delete</button>
      )
    }

    return (
      <div className="wrapper" ref={this.ref}>
        <div>
          <h1>{blog && blog.title} {blog && blog.author}</h1>
          <div>
            <a href={blog && blog.url} className="url">{blog && blog.url}</a><br/>
            <span className="likes">{blog && blog.likes}</span> likes
            <button onClick={() => handleLike()} className="button like">Like</button><br/>
            Added by {blog && blog.user ? (blog.user.name || '').toString() : 'Anonymous'}<br/>
            <DeleteButton/>
          </div>
        </div>
      </div>
    )}
}

const mapStateToProps = (state,props) => ({
  user: state.user || JSON.parse(localStorage.getItem('currentuser')),
  blog: state.blogs.find(b => b._id === props.id)
})

export default connect(
  mapStateToProps,
  {deleteBlog, likeBlog, notify, initBlogs}
)(Blog)