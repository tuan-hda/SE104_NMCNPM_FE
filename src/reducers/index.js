import loggedInReducer from "./loggedInReducer";
import cartReducer from "./cartReducer";
import { combineReducers } from 'redux'

const allReducers = combineReducers({
  isLogged: loggedInReducer,
  cart: cartReducer
})

export default allReducers