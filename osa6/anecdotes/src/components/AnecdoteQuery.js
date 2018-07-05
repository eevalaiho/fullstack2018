import React from 'react'
import PropTypes from 'prop-types'
import { addQuery } from './../reducers/queryReducer'

class AnecdoteQuery extends React.Component {

  handleChange = (e) => {
    //console.log(e.target.value)
    this.context.store.dispatch(addQuery(e.target.value))
  }

  render() {
    const style = {
      marginBottom: 10
    }

    return (
      <div style={style}>
        Query:
        <input onChange={this.handleChange}></input>
      </div>
    )
  }
}

AnecdoteQuery.contextTypes = {
  store: PropTypes.object
}

export default AnecdoteQuery
