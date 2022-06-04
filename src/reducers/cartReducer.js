const INITIAL_STATE = {
    qty: 0
}
const cartReducer = (state = INITIAL_STATE,action) => {
    switch (action.type) {
        case 'INIT_CART':
            return {
                qty: action.payload
            }
        case 'ADD_TO_CART':
            return {
                ...state,
                qty: state.qty + action.payload 
            }
        case 'REMOVE_FROM_CART':
            return {
                ...state,
                qty: state.qty - action.payload 
            }
        case 'ADJUST_QTY':
            return {
                ...state,
                qty: state.qty - action.payload.quantityBefore + action.payload.quantityAfter
            }
        default:
            return state;
    }
}
export default cartReducer