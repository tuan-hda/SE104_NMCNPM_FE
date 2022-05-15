const provinceReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_PROVINCE':
      return action.payload;
    default:
      return state;
  }
}

export default provinceReducer
