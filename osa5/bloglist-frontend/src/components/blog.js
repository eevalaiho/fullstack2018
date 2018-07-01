import React from 'react'

class Blog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false
    }
  }

  toggleVisibility = () => {
    this.setState({visible: !this.state.visible})
  }

  render() {
    const hideWhenVisible = {display: this.state.visible ? 'none' : ''}
    const showWhenVisible = {display: this.state.visible ? '' : 'none'}
    const blog = this.props.blog
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
          <a onClick={this.toggleVisibility}>{blog.title} {blog.author}</a>
        </div>
        <div style={showWhenVisible}>
          <a onClick={this.toggleVisibility}>{blog.title} {blog.author}</a>
          <div>
            <a href={blog.url}>{blog.url}</a><br/>
            {blog.likes} likes <button>Like</button>
          </div>
        </div>
      </div>
    )
  }
}

export default Blog