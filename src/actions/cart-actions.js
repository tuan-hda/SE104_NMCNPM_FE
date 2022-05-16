export const addToCart = ({product,quantity}) => {
    return {
        type: 'ADD_TO_CART',
        payload: {
            product,
            quantity
        }
    }
}

export const removeFromCart = (item) => {
    return {
        type: 'REMOVE_FROM_CART',
        payload: item
    }
}

export const adjustQty = (item,value) => {
    return {
        type: 'ADJUST_QTY',
        payload: {
            item,
            value
        }
    }
}