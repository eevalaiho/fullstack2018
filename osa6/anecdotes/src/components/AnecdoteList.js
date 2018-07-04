import React from 'react'
import PropTypes from 'prop-types'
import { voteAnecdote } from './../reducers/anecdoteReducer'
import { notify } from './../reducers/notificationReducer'

class AnecdoteList extends React.Component {

  handleVote = (e, anecdote) => {
    e.preventDefault()
    if (anecdote) {
      this.context.store.dispatch(voteAnecdote(anecdote.id))
      this.context.store.dispatch(notify(
        'You voted for \'' + anecdote.content + '\''))
      setTimeout(() => {
        this.context.store.dispatch(notify(null))
      }, 5000)
    }
  }

  render() {
    const anecdotes = this.context.store.getState().anecdotes
    //console.log(anecdotes)
    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={(e) => this.handleVote(e, anecdote)}>vote</button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

AnecdoteList.contextTypes = {
  store: PropTypes.object
}

export default AnecdoteList