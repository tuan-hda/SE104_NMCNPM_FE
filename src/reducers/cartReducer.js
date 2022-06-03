const INITIAL_STATE = {
    cartItems: [], // Products Info + quantity
}
const cartReducer = (state = INITIAL_STATE,action) => {
    switch (action.type) {
        case 'ADD_TO_CART':
            //Get items data from products array
            //const item = state.products.find((prod) => prod=)
            const product = action.payload.product
            const quantity = action.payload.quantity
            
            // Check if Item is in cart already
            const inCart = state.cartItems.find((item) => 
                item.id === product.id ? true : false                    
            )
            return {
                ...state,
                cartItems : inCart   
                ? state.cartItems.map((item) =>
                    item.id === product.id
                    ? {...item, qty: item.qty+quantity}
                    : item
                    )
                : [...state.cartItems, {...product,qty:quantity}]
            }
        case 'REMOVE_FROM_CART':
            return {
                ...state,
                cartItems: state.cartItems.filter(item => item.id !== action.payload.id)
            }
        case 'ADJUST_QTY':
            return {
                ...state,
                cartItems: state.cartItems.map((item) =>
                    item.id === action.payload.item.id
                    ? {...item, qty: +action.payload.value}
                    : item
                )
            }
        default:
            return state;
    }
}
export default cartReducer