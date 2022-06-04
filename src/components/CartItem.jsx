import React, {useEffect, useState} from 'react'
import CartProductThumb from './CartProductThumb'
import removeIcon from '../images/removeIcon.png'

import { connect,useSelector } from 'react-redux'
import { removeFromCart, adjustQty } from '../actions/cart-actions'
import appApi from '../api/appApi';
import * as routes from '../api/apiRoutes'

const CartItem = ({itemData,removeFromCart, adjustQty,isEditable}) => {

  const [quantity,setQuantity] = useState(itemData.number)
  const { currentUser} = useSelector(state => state.user)

  const onChangeHandler = (e) => {
    adjustQty(itemData,e.target.value)
    setQuantity(e.target.value);
  }
  
  const handleIncrease = () => {
    adjustQty(itemData,+quantity+1)
    setQuantity(+quantity+1)   
  }
  const handleDecrease = () => {
      if (quantity>1) {
        adjustQty(itemData,+quantity-1)
        setQuantity(+quantity-1)
      }
  }

  const handleUpdateCart = async () => {
    try {
      const token = await currentUser.getIdToken()

      await appApi.put(
        routes.UPDATE_CART_ITEM,
        routes.getUpdateCartBody(
          itemData.product.id,
          quantity
        ),
        routes.getAccessTokenHeader(token)
      )

      console.log('Update thành công rồi nha: ')
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    handleUpdateCart()
  },[quantity])

  const handleRemove = async () => {
    try {
      const token = await currentUser.getIdToken()

      await appApi.delete(
        routes.DELETE_CART_ITEM, {
          headers: {
            Authorization: 'Bearer '+token
          },
          data: {
            itemID: itemData.product.id
          }
        }
      );

      console.log(JSON.stringify(routes.getAccessTokenHeader(token)))

      removeFromCart(itemData)
    } catch (err) {
      if (err.response) {
        console.log(err.response.data)
        console.log(err.response.status)
        console.log(err.response.headers)
      } 
      else {
        console.log(err.message)
      }
    } 
  }

  return (
    <div className={'grid '+(isEditable ? 'grid-cols-6' : 'grid-cols-5')+' py-4 place-items-center'}>
      {/* Items */}
      <CartProductThumb itemData={itemData} />
      {/* Quantity */}
      {isEditable ? 
      <div className='flex items-center gap-3'>
        <button onClick={handleDecrease}>
          <h6 className='text-32 mb-1'>-</h6>
        </button>
        <input className=' w-8 h-8 placeholder-black-placeholder
        border-gray-border font-semibold text-15 text-center outline-0 border-[1px] rounded-md' 
        value={quantity}
        onChange={onChangeHandler}
        />
        <button onClick={handleIncrease}>
          <h6 className=' text-32'>+</h6>
        </button> 
      </div>
      : 
      <h6 className='font-semibold text-15'>{quantity}</h6>
      }
      {/* Total */}
      <h6 className='font-semibold text-15 text-primary'>{'$'+itemData.product.price*quantity}</h6>
      {/* Remove */}
      {
      isEditable&&
      (<button className='w-6 h-6' onClick={handleRemove}>
        <img src={removeIcon} alt="Remove" />
      </button>)
      }
    </div>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    removeFromCart: (itemData) => dispatch(removeFromCart(itemData)),
    adjustQty: (itemData,value) => dispatch(adjustQty(itemData,value))
  }
}

export default connect(null,mapDispatchToProps)(CartItem)