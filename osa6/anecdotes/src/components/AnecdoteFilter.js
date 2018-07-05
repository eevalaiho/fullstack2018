import React from 'react'
import PropTypes from 'prop-types'
import { addFilter } from './../reducers/filterReducer'

class AnecdoteFilter extends React.Component {

  handleChange = (e) => {
    //console.log(e.target.value)
    this.context.store.dispatch(addFilter(e.target.value))
  }

  render() {
    const style = {
      marginBottom: 10
    }

    return (
      <div style={style}>
        Filter:
        <input onChange={this.handleChange}></input>
      </div>
    )
  }
}

AnecdoteFilter.contextTypes = {
  store: PropTypes.object
}

export default AnecdoteFilter
