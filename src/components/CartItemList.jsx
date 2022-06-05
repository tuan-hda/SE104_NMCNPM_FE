import React from 'react'
import CartItem from '../components/CartItem'

const CartItemList = ({cart,prop,isEditable}) => {
    //console.log('cart nè: '+cart[0].itemID)
    return (
        <div className= {prop}>
            <div className={'grid '+(isEditable ? 'grid-cols-6' : 'grid-cols-5')+' h-10 text-13 font-bold text-divider border-y-2 place-content-center place-items-center'}>
                <h2 className='place-self-start col-span-3'>PRODUCT DETAILS</h2>
                <h2>QUANTITY</h2>
                <h2>TOTAL</h2>
                {isEditable&&<h2 className=''>REMOVE</h2>}                
            </div>
            {/* Items */}
            {cart.map((item) => <CartItem itemData={item} isEditable={isEditable} key={item.id}/>)}
        </div>
    )
}

export default CartItemList