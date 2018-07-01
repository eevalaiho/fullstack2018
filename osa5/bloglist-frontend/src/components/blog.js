import React from 'react'
import ReactDOM from 'react'
import blogService from "../services/blogs";

class Blog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false
    }
    this.blog = this.props.blog
    this.user = this.props.user
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

  deleteBlog = async () => {
    if (window.confirm('Really delete \'' + this.blog.title +'\' by ' + this.blog.author + '?')) {
      await blogService
        ._delete(this.blog._id)
        .then(() => {
          this.blog = null
        })
      setTimeout(() => {
        this.forceUpdate()}, 100)
    }
  }

  render() {
    if (!this.blog)
      return null

    console.log(this.blog.user)
    console.log(this.user)

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
        <div style={hideWhenVisible}>
          <a onClick={this.toggleVisibility}>{this.blog.title} {this.blog.author}</a>
        </div>
        <div style={showWhenVisible}>
          <a onClick={this.toggleVisibility}>{this.blog.title} {this.blog.author}</a>
          <div>
            <a href={this.blog.url}>{this.blog.url}</a><br/>
            {this.blog.likes} likes <button onClick={this.likeBlog}>Like</button><br />
            Added by { this.blog.user ? this.blog.user.name.toString() : 'Anonymous'}<br />
            { !this.blog.user || ( this.blog.user._id.toString() === this.user._id.toString() )
              ? <button onClick={this.deleteBlog}>Delete</button>
              : ''}
          </div>
        </div>
      </div>
    )
  }
}

export default Blog