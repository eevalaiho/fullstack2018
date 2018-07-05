import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { createAnecdote } from './../reducers/anecdoteReducer'

class AnecdoteForm extends React.Component {

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.createAnecdote(e.target.content.value)
    e.target.content.value = ''
  }

  render() {
    return (
      <div>
        <h2>Create new</h2>
        <form onSubmit={this.handleSubmit}>
          <div><input name='content'/></div>
          <button>Create</button>
        </form>
      </div>
    )
  }
}

AnecdoteForm.contextTypes = {
  store: PropTypes.object
}

export default connect(
  null,
  { createAnecdote }
)(AnecdoteForm)