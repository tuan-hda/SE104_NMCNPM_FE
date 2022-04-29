import loggedInReducer from "./loggedInReducer";
import { combineReducers } from 'redux'

const allReducers = combineReducers({
  isLogged: loggedInReducer
})

export default allReducers