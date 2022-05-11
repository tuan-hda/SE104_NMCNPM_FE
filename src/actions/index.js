export const signin = () => {
  return {
    type: 'SIGN_IN'
  }
}

export const signout = () => {
  return {
    type: 'SIGN_OUT'
  }
}

export const setProvince = (data) => {
  return {
    type: 'SET_PROVINCE',
    payload: data
  }
}

export const setDistrict = (data) => {
  return {
    type: 'SET_DISTRICT',
    payload: data
  }
}

export const setWard = (data) => {
  return {
    type: 'SET_WARD',
    payload: data
  }
}