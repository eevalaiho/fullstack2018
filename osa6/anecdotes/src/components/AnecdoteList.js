import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import AnecdoteQuery from './AnecdoteQuery'
import Anecdote from './Anecdote'
import { voteAnecdote } from './../reducers/anecdoteReducer'
import { addNotification, removeNotification } from './../reducers/notificationReducer'

class AnecdoteList_internal extends React.Component {

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

    const anecdotesToShow = () => {
      const {anecdotes, query} = this.props
      return anecdotes
        .filter(a => a.content.toLowerCase().includes(query.toLowerCase()))
        .sort((a, b) => b.votes - a.votes)
    }

    //console.log(anecdotes)
    return (
      <div>
        <h2>Anecdotes</h2>
        <AnecdoteQuery />
        {anecdotesToShow().map(anecdote =>
          <Anecdote key={anecdote.id} anecdote={anecdote} handleVote={() => this.voteAnecdote(anecdote)} />
        )}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    query: state.query
  }
}

const AnecdoteList = connect(
  mapStateToProps
)(AnecdoteList_internal)

AnecdoteList_internal.contextTypes = {
  store: PropTypes.object
}

export default AnecdoteList