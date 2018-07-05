import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Filter from './Filter'
import Anecdote from './Anecdote'
import { modifyAnecdote } from './../reducers/anecdoteReducer'
import { addNotification, removeNotification } from './../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteList = (props) => {

  const handleVote = async (anecdote) => {
    //console.log(anecdote)
    if (anecdote) {
      anecdote.votes = anecdote.votes + 1
      await anecdoteService.update(anecdote)
        .then(response => props.modifyAnecdote(response.data))
      props.addNotification('You voted for \'' + anecdote.content + '\'')
      setTimeout(() => {
        props.removeNotification()
      }, 5000)
    }
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter />
      {props.anecdotesToShow.map(anecdote =>
        <Anecdote key={anecdote.id} anecdote={anecdote}
                  handleVote={() => handleVote(anecdote)} />
      )}
    </div>
  )
}

const getAnecdotesToShow = (anecdotes, filter) => {
  return anecdotes
    .filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))
    .sort((a, b) => b.votes - a.votes)
}

const mapStateToProps = (state) => {
  return {
    anecdotesToShow: getAnecdotesToShow(state.anecdotes, state.filter)
  }
}

AnecdoteList.contextTypes = {
  store: PropTypes.object
}

export default connect(
  mapStateToProps,
  {modifyAnecdote, addNotification, removeNotification}
)(AnecdoteList)