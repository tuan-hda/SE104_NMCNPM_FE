import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { initCart } from '../../actions/cart-actions'
import Check from '../../images/check.png'

const OrderSuccessModal = ({ isShowing, data, info }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // get html from delivery info
  const getDeliveryInfo = info => {
    return (
      <div className='text-[12px] leading-[14px] font-medium'>
        <p>
          {info.name}, {info.phone}
        </p>
        <p>
          {info.address},{' '}
          {info.province.substring(info.province.indexOf('_') + 1)},{' '}
          {info.district.substring(info.district.indexOf('_') + 1)},{' '}
          {info.ward.substring(info.ward.indexOf('_') + 1)}
        </p>
      </div>
    )
  }

  // Back to home page
  const continueShopping = () => {
    navigate('/')
    dispatch(initCart(0))
  }

  // View orders
  const viewOrders = () => {
    navigate('/profile/orders')
    dispatch(initCart(0))
  }

  return (
    <div
      className={`address-modal-layer ${
        isShowing ? '' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className='order-success-modal flex items-center text-13'>
        <img src={Check} alt='Order Succeeded' className='w-16 h-16' />

        <h1 className='font-bold text-xl text-center mt-5'>Success</h1>

        <p>Thanks for your order.</p>

        {/* Order and shipping detail */}
        <div className='rounded-md border-[1px] text-sm border-gray-border w-full p-2 mt-8'>
          {/* Title */}
          <h2 className='text-[11px] w-full font-bold'>
            {'Order and shipping detail'.toUpperCase()}
          </h2>

          <div className='flex justify-between'>
            {/* Left section */}
            <div className='space-y-3'>
              <p>Order Amount</p>
            </div>

            {/* Right section */}
            <div className='font-semibold space-y-3 text-right text-red-500'>
              import ProvinceGetter from '../components/ProvinceGetter'
              <p>
                $
                {(info.subtotal || 0) +
                  (info.deliveryFee || 0) -
                  (info.discount || 0)}
              </p>
            </div>
          </div>

          {/* Delivery Info */}
          <div className='mt-3'>
            <p> Delivery Info</p>
            {getDeliveryInfo(data.deliveryInfo)}
          </div>
        </div>

        <button
          type='button'
          className='w-full bg-primary text-white rounded-md text-[11px] py-3 mt-8 hover:bg-opacity-90 transition duration-300'
          onClick={continueShopping}
        >
          CONTINUE SHOPPING
        </button>

        <button
          type='button'
          className='w-full bg-white text-black border-[1px] border-gray-border rounded-md text-[11px] py-3 mt-2 hover:bg-gray-border transition duration-300'
          onClick={viewOrders}
        >
          VIEW YOUR ORDERS
        </button>
      </div>
    </div>
  )
}

export default OrderSuccessModal
