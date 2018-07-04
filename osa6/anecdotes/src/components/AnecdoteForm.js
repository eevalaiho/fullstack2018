import React from 'react'
import { createAnecdote } from './../reducers/anecdoteReducer'

class AnecdoteForm extends React.Component {

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.store.dispatch(createAnecdote(e.target.content.value))
    e.target.content.value = ''
  }

  render() {
    return (
      <div>
        <h2>create new</h2>
        <form onSubmit={this.handleSubmit}>
          <div><input name='content'/></div>
          <button>create</button>
        </form>
      </div>
    )
  }
}

export default AnecdoteForm