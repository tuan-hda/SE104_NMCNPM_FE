export const initCart = (quantity) => {
    return {
        type: 'INIT_CART',
        payload: quantity
    }
}

export const addToCart = (quantity) => {
    return {
        type: 'ADD_TO_CART',
        payload: quantity
    }
}

export const removeFromCart = (quantity) => {
    return {
        type: 'REMOVE_FROM_CART',
        payload: quantity
    }
}

export const adjustQty = (quantityBefore, quantityAfter) => {
    return {
        type: 'ADJUST_QTY',
        payload: {
            quantityBefore,
            quantityAfter
        }
    }
}