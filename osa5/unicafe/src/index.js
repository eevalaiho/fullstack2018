import React from 'react'
import ReactDOM from 'react-dom'
import {createStore} from 'redux'
import counterReducer from './store/counterReducer'

const store = createStore(counterReducer)

const Statistiikka = () => {
  //console.log(store.getState())
  const palautteita = store.getState()
  palautteita.count = palautteita.good + palautteita.ok + palautteita.bad

  if (palautteita.count === 0) {
    return (
      <div>
        <h2>Statistiikka</h2>
        <div>Ei yhtään palautetta annettu</div>
      </div>
    )
  }

  return (
    <div>
      <h2>Statistiikka</h2>
      <table>
        <tbody>
        <tr>
          <td>Hyvä</td>
          <td>{palautteita.good}</td>
        </tr>
        <tr>
          <td>Neutraali</td>
          <td>{palautteita.ok}</td>
        </tr>
        <tr>
          <td>Huono</td>
          <td>{palautteita.bad}</td>
        </tr>
        <tr>
          <td>Keskiarvo</td>
          <td>{palautteita.count > 0
                ? ((palautteita.good - palautteita.bad) / palautteita.count).toFixed(2)
                : 0}</td>
        </tr>
        <tr>
          <td>Positiivisia</td>
          <td>{palautteita.good > 0
            ? Math.round(((palautteita.good) / palautteita.count)*100)
            : 0}%</td>
        </tr>
        </tbody>
      </table>
      <button onClick={e => store.dispatch({ type: 'ZERO'})}>Nollaa tilasto</button>
    </div >
  )
}

class App extends React.Component {
  render() {
    return (
      <div>
        <h2>Anna palautetta</h2>
        <button onClick={e => store.dispatch({ type: 'GOOD'})}>Hyvä</button>
        <button onClick={e => store.dispatch({ type: 'OK'})}>Neutraali</button>
        <button onClick={e => store.dispatch({ type: 'BAD'})}>Huono</button>
        <Statistiikka />
      </div>
    )
  }
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)