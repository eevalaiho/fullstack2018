import React from 'react'
import PropTypes from 'prop-types'
import { filterAnecdotes } from './../reducers/anecdoteReducer'

class AnecdoteFilter extends React.Component {

  handleChange = (e) => {
    //console.log(e.target.value)
    this.context.store.dispatch(filterAnecdotes(e.target.value))
  }

  render() {
    return (<div>
      Filter:
      <input onChange={this.handleChange}></input>
    </div>)
  }
}

AnecdoteFilter.contextTypes = {
  store: PropTypes.object
}

export default AnecdoteFilter
