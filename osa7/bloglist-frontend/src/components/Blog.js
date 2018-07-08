import React from 'react'
import { connect } from 'react-redux'
import PropTypes from "prop-types";
import {deleteBlog, likeBlog} from '../reducers/blogReducer'
import {notify} from '../reducers/notificationReducer'

const Blog = (props) => {

  let hideContent = true

  const {blog, user} = props

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleVisibility = async (e) => {
    e.preventDefault()
    hideContent = !hideContent
    e.target.parentNode.children[1].setAttribute('style', hideContent ? 'display: none' : '')
  }

  const handleLike = async () => {
    props.likeBlog(blog)
  }

  const handleDelete = async () => {
    if (window.confirm(`Really delete '${blog.title}' by '${blog.author}'?`)) {
      props.deleteBlog(blog)
      props.notify(`Blog '${blog.title}' by '${blog.author}' was deleted`, 5)
    }
  }

  const DeleteButton = () => {
    if (!user || (blog.user && blog.user._id !== user._id))
      return null
    return (
      <button onClick={() => handleDelete()} className="button delete">Delete</button>
    )
  }

  return (
    <div style={blogStyle} className="wrapper" ref={this.ref}>
      <div>
        <a onClick={(e) => toggleVisibility(e)} className="button title">{blog.title} {blog.author}</a>
        <div className="content" style={hideContent ? {display: 'none'} : {}}>
          <a href={blog.url} className="url">{blog.url}</a><br/>
          <span className="likes">{blog.likes}</span> likes
          <button onClick={() => handleLike()} className="button like">Like</button><br/>
          Added by {blog.user ? (blog.user.name || '').toString() : 'Anonymous'}<br/>
          <DeleteButton />
        </div>
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired
}

Blog.contextTypes = {
  user: PropTypes.object
}

const mapStateToProps = (state) => {
  return {
    user: state.user || JSON.parse(localStorage.getItem('user'))
  }
}

export default connect(
  mapStateToProps,
  {deleteBlog, likeBlog, notify}
)(Blog)