import cartReducer from "./cartReducer";
import { combineReducers } from 'redux'
import authReducer from "./authReducer";

const allReducers = combineReducers({
  cart: cartReducer,
  user: authReducer
})

export default allReducers