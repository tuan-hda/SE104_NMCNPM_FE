const wardReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_WARD':
      return action.payload;
    default:
      return state;
  }
}

export default wardReducer