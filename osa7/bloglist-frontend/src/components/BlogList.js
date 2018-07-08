import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Blog from './Blog'
import {notify} from "../reducers/notificationReducer";
import {modifyBlog} from "../reducers/blogReducer";

const BlogList = (props) => {
  return (
    <div>
      <h2>Blog list</h2>
      <div>
        { props.blogsToShow.map(blog =>
            <Blog key={blog._id} blog={blog} /> )
        }
      </div>
    </div>
)}

const getBlogsToShow = (blogs) => {
  return blogs
    .sort((a, b) => b.likes - a.likes)
}

const mapStateToProps = (state) => {
  return {
    blogsToShow: getBlogsToShow(state.blogs, state.filter)
  }
}

BlogList.contextTypes = {
  store: PropTypes.object
}

export default connect(
  mapStateToProps,
  {modifyBlog, notify}
)(BlogList)
