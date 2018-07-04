import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import App from './App'
import anecdoteReducer from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'

const reducer = combineReducers({
  anecdotes: anecdoteReducer,
  notification: notificationReducer
})

const store = createStore(reducer)

console.log(store.getState())

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <div> </div>
    </Provider>,
    document.getElementById('root'))
}

render()
store.subscribe(render)