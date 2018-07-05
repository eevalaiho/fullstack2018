import React from 'react'

const Anecdote = ({anecdote, handleVote}) => {
  return (
    <div key={anecdote.id}>
      <div>
        {anecdote.content}
      </div>
      <div>
        Has {anecdote.votes}
        <button onClick={handleVote}>Vote</button>
      </div>
    </div>
  )
}

export default Anecdote