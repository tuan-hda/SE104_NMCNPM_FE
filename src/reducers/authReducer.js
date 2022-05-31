import { type } from '@testing-library/user-event/dist/type'
import * as types from '../actions/actionTypes'

const initialState = {
  loading: false,
  currentUser: null,
  error: null
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SIGN_UP_START:
    case types.SIGN_IN_START:
    case types.LOG_OUT_START:
    case types.GOOGLE_SIGN_IN_START:
    case types.FACEBOOK_SIGN_IN_START:
      return {
        ...state,
        loading: true
      }

    case types.SIGN_UP_SUCCESS:
    case types.SIGN_IN_SUCCESS:
    case types.GOOGLE_SIGN_IN_SUCCESS:
    case types.FACEBOOK_SIGN_IN_SUCCESS:
      return {
        loading: false,
        currentUser: action.payload,
        error: null
      }

    case types.SIGN_UP_FAIL:
    case types.SIGN_IN_FAIL:
    case types.LOG_OUT_FAIL:
    case types.GOOGLE_SIGN_IN_FAIL:
    case types.FACEBOOK_SIGN_IN_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      }

    case types.SET_USER:
      return {
        loading: false,
        error: null,
        currentUser: action.payload
      }

    case types.LOG_OUT_SUCCESS:
      return {
        loading: false,
        error: null,
        currentUser: null
      }

    default:
      return state
  }
}

export default authReducer