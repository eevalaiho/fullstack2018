import React from 'react'
import { connect } from 'react-redux'
import { createBlog } from "../reducers/blogReducer";
import { notify } from "../reducers/notificationReducer";

class BlogForm extends React.Component {

  createBlog = async (e) => {
    e.preventDefault()
    try {
      const response = this.props.createBlog({
        title: e.target.title.value,
        author: e.target.author.value,
        url: e.target.url.value
      })
      this.props.notify(`A new blog entry '${response.title}' was entered`, 5)
    } catch (exception) {
      console.log(exception)
      this.props.notify(`Something went wrong ...`, 5, 'ERROR')
    }
  }

  render() {
    return (<div>
      <h2>Create a blog</h2>
      <form onSubmit={(e) => this.createBlog(e)} method="post">
        <div>
          <label>Title:</label>
          <input name="title"/>
        </div>
        <div>
          <label>Author:</label>
          <input name="author"/>
        </div>
        <div>
          <label>Url:</label>
          <input name="url"/>
        </div>
        <button type="submit">Add</button>
      </form>
    </div>)
  }
}

export default connect(
  null,
  {createBlog, notify}
)(BlogForm)