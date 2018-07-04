import React from 'react';


class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      newanecdote: '',
    }
  }

  handleFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  render() {
    const store = this.props.store
    const anecdotes = store.getState()
    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotes.map(anecdote=>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={e => store.dispatch({ type: 'VOTE', id: anecdote.id})}>vote</button>
            </div>
          </div>
        )}
        <h2>create new</h2>
        <form>
          <div><input value={this.state.newanecdote} name="newanecdote" onChange={this.handleFieldChange} /></div>
          <button onClick={e => {e.preventDefault(); store.dispatch({ type: 'CREATE', content: this.state.newanecdote})}}>create</button>
        </form>
      </div>
    )
  }
}

export default App