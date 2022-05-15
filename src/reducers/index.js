import loggedInReducer from "./loggedInReducer";
import cartReducer from "./cartReducer";
import { combineReducers } from 'redux'
import provinceReducer from "./provinceReducer";
import districtReducer from "./districtReducer";
import wardReducer from "./wardReducer";

const allReducers = combineReducers({
  isLogged: loggedInReducer,
  cart: cartReducer
  isLogged: loggedInReducer,
  province: provinceReducer,
  district: districtReducer,
  ward: wardReducer
})

export default allReducers