import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'
import notificationReducer from "./reducers/notificationReducer";
import authReducer from "./reducers/authReducer";

const reducer = combineReducers({
  blogs: blogReducer,
  users: userReducer,
  notification: notificationReducer,
  currentuser: authReducer
})

const store = createStore(
  reducer,
  applyMiddleware(thunk)
)
console.log('store', store.getState())

export default store
