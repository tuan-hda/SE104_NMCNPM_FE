import React, { useState, useEffect } from 'react'
import { connect, useSelector } from 'react-redux'
import CartItemList from '../components/CartItemList'
import api from '../api/appApi'
import * as routes from '../api/apiRoutes'
import { hambursyLoader } from '../components/LoadingScreen'
import { useNavigate } from 'react-router-dom'

const Cart = ({ qty }) => {
  const [loading, setLoading] = useState(true)
  const [items, setItems] = useState([])
  const [subTotal, setSubTotal] = useState(0)
  const [promoPrice,setPromoPrice] = useState(0)
  const { currentUser } = useSelector(state => state.user)
  const { currentUser, loading: loadin } = useSelector(state => state.user)
  const navigate = useNavigate()

  useEffect(() => {
    let price = 0, promoPrice=0

    for (let i = 0; i < items.length; i++) {
      price += items[i].number * items[i].product.price
      promoPrice += items[i].totalPricePromo
    }

    setSubTotal(price)
    setPromoPrice(promoPrice)
  }, [items, subTotal, setSubTotal])

  const fetchCart = async () => {
    try {
      const token = await currentUser.getIdToken()

      let result = await api.get(
        routes.DISPLAY_CART_ITEM,
        routes.getAccessTokenHeader(token)
      )

      if (result.data.cartItems !== 'hmu') setItems([...result.data.cartItems])
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  //get Cart
  useEffect(() => {
    fetchCart()
  }, [qty])

  // navigate to login if user is anonymous
  useEffect(() => {
    if (!loadin && !currentUser) navigate('/signin')
  }, [loadin, currentUser, navigate])
  const deliveryFee = 20000

  if (loading)
    return (
      <div className='w-full h-[75%] flex items-center justify-center'>
        {hambursyLoader}
      </div>
    )

  return (
    <div className='py-4 px-32 w-full h-full flex justify-between gap-16'>
      {/* Left section */}
      <div>
        {/* page Title */}
        <h1 className='text-34 font-extrabold'>Cart</h1>
        <div className='mt-8'>
          {/* Item list */}
          <CartItemList cart={items} prop='w-[800px]' isEditable={true} />
        </div>
      </div>

      {/* Right section */}
      {/* Order Summary */}
      <div className=' bg-[#F5F5F6] flex-grow h-full mt-4 rounded-xl'>
        <div className=' px-11 py-11'>
          {/* Title */}
          <h2 className=' font-semibold text-[24px] mb-10 h-16 border-b-[1px] border-[#C6BDBD]'>
            ORDER SUMMARY
          </h2>
          {/* Subtotal */}
          <div className='w-full grid grid-cols-2 justify-between mb-10'>
            <h3>SUBTOTAL</h3>
            <h3 className='place-self-end font-medium'>{'$' + subTotal}</h3>
          </div>
          {/* TAX */}
          <div className='w-full grid grid-cols-2 justify-between mb-10'>
            <h3>DISCOUNT</h3>
            <h3 className='place-self-end font-medium'>{'$'+(+subTotal-promoPrice)}</h3>
          </div>
          {/* Delivery Fee */}
          <div className='w-full grid grid-cols-2 justify-between mb-20'>
            <h3>DELIVERY FEE</h3>
            <h3 className='place-self-end font-medium'>{'$' + deliveryFee}</h3>
          </div>
          {/* ESTIMATED TOTAL */}
          <div className='w-full grid grid-cols-2 justify-between place-content-center h-24 border-t-[1px] border-[#C6BDBD]'>
            <h3 className='font-semibold'>ESTIMATED TOTAL</h3>
            <h3 className='font-semibold text-secondary place-self-end'>
              {'$' + (promoPrice+deliveryFee)}
            </h3>
          </div>
          {/* Add to Cart Button */}
          <button
            className={`${
              qty ? 'bg-secondary text-white' : 'bg-gray-200 text-gray-500'
            } hidden md:flex items-center justify-center text-22  font-semibold rounded-[15px] w-full h-14 px-10`}
            disabled={!qty}
            onClick={() => navigate('/purchase')}
          >
            CHECKOUT
          </button>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    qty: state.cart.qty
  }
}

export default connect(mapStateToProps)(Cart)
