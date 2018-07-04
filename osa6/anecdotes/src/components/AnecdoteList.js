import React from 'react'
import PropTypes from 'prop-types'
import AnecdoteFilter from './AnecdoteFilter'
import { voteAnecdote } from './../reducers/anecdoteReducer'
import { addNotification, removeNotification } from './../reducers/notificationReducer'

class AnecdoteList extends React.Component {

  handleVote = (e, anecdote) => {
    e.preventDefault()
    if (anecdote) {
      this.context.store.dispatch(voteAnecdote(anecdote.id))
      this.context.store.dispatch(
        addNotification('You voted for \'' + anecdote.content + '\''))
      setTimeout(() => {
        this.context.store.dispatch(removeNotification())
      }, 5000)
    }
  }

  render() {
    const anecdotes = this.context.store.getState().anecdotes
    //console.log(anecdotes)
    return (
      <div>
        <h2>Anecdotes</h2>
        <AnecdoteFilter />
        {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              Has {anecdote.votes}
              <button onClick={(e) => this.handleVote(e, anecdote)}>Vote</button>
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