import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { addFilter } from './../reducers/filterReducer'

const Filter = (props) => {
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      Query:
      <input onChange={(e) => props.addFilter(e.target.value)} />
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    filter: state.filter
  }
}

Filter.contextTypes = {
  store: PropTypes.object
}

export default connect(
  mapStateToProps,
  { addFilter }
)(Filter)
