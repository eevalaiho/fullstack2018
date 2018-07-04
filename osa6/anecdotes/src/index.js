import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import App from './App'
import anecdoteReducer, { createAnecdote } from './reducers/anecdoteReducer'
import notificationReducer, {notify} from './reducers/notificationReducer'

const reducer = combineReducers({
  anecdotes: anecdoteReducer,
  notification: notificationReducer
})

const store = createStore(reducer)

//console.log(store.getState())
//store.subscribe(() =>
  //console.log(store.getState())
//)
//console.log(store.getState())
//store.dispatch(createAnecdote('combineReducers muodostaa yhdistetyn reducerin'))
//store.dispatch(notify('combineReducers muodostaa yhdistetyn reducerin'))

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root'))
}

render()
store.subscribe(render)