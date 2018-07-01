import React from 'react'
import blogService from "../services/blogs";

class Blog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false
    }
    this.blog = this.props.blog
  }

  toggleVisibility = () => {
    this.setState({visible: !this.state.visible})
  }

  likeBlog = async () => {
    this.blog = await blogService
      .like(this.blog._id)
    setTimeout(() => {
      this.forceUpdate()}, 100)
  }

  render() {
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
      <div style={blogStyle}>
        {this.key}
        <div style={hideWhenVisible}>
          <a onClick={this.toggleVisibility}>{this.blog.title} {this.blog.author}</a>
        </div>
        <div style={showWhenVisible}>
          <a onClick={this.toggleVisibility}>{this.blog.title} {this.blog.author}</a>
          <div>
            <a href={this.blog.url}>{this.blog.url}</a><br/>
            {this.blog.likes} likes <button onClick={this.likeBlog}>Like</button>
          </div>
        </div>
      </div>
    )
  }
}

export default Blog