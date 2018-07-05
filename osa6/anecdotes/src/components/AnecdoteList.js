import React from 'react'
import PropTypes from 'prop-types'
import AnecdoteFilter from './AnecdoteFilter'
import Anecdote from './Anecdote'
import { voteAnecdote } from './../reducers/anecdoteReducer'
import { addNotification, removeNotification } from './../reducers/notificationReducer'

class AnecdoteList extends React.Component {

  voteAnecdote = (anecdote) => {
    console.log(anecdote)
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
          <Anecdote key={anecdote.id} anecdote={anecdote} handleVote={() => this.voteAnecdote(anecdote)} />
        )}
      </div>
    )
  }
}

AnecdoteList.contextTypes = {
  store: PropTypes.object
}

export default AnecdoteList