import React from 'react'
import PropTypes from "prop-types";

class Blog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      blog: this.props.blog,
      user_id: this.props.user._id
    }
    this.onLikeClick = this.props.onLikeClick
    this.onDeleteClick = this.props.onDeleteClick
  }

  toggleVisibility = () => {
    this.setState({visible: !this.state.visible})
  }

  render() {
    if (!this.state.blog)
      return null

    const blog = this.state.blog
    const hideWhenVisible = {display: this.state.visible ? 'none' : ''}
    const showWhenVisible = {display: this.state.visible ? '' : 'none'}
    const blogStyle = {
      paddingTop: 10,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5
    }
    return (
      <div style={blogStyle} className="wrapper" ref={this.ref}>
        <div style={hideWhenVisible}>
          <a onClick={this.toggleVisibility} className="button title">{blog.title} {blog.author}</a>
        </div>
        <div style={showWhenVisible}>
          <a onClick={this.toggleVisibility} className="button title">{blog.title} {blog.author}</a>
          <div className="content">
            <a href={blog.url} className="url">{blog.url}</a><br/>
            <span className="likes">{blog.likes}</span> likes
              <button onClick={() => this.props.onLikeClick(blog).then(result => this.setState({ blog: result }))}
                      className="button like">Like</button><br />
            Added by { blog.user ? blog.user.name.toString() : 'Anonymous'}<br />
            { !blog.user || ( blog.user._id.toString() === this.state.user_id.toString() )
              ? <button onClick={() => this.props.onDeleteClick(blog)} className="button delete">Delete</button>
              : ''}
          </div>
        </div>
      </div>
    )
  }
}

Blog.propTypes = {
  user: PropTypes.object.isRequired,
  blog: PropTypes.object.isRequired
}


export default Blog