import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Check from '../../images/check.png'

const sampleDeliveryInfo = {
  name: 'Hoang Dinh Anh Tuan',
  phone: '0849167234',
  email: 'hdatdragon2@gmail.com',
  address: '22 Le Duan',
  province: 'Quang Tri',
  district: 'Trieu Phong',
  ward: 'Thi tran Ai Tu'
}

const OrderSuccessModal = ({ isShowing, progress }) => {
  const navigate = useNavigate()

  // get html from delivery info
  const getDeliveryInfo = (info) => {
    return <div className='text-[12px] leading-[14px] font-medium'>
      <p>{info.name}, {info.phone}</p>
      <p>{info.address}, {info.province}, {info.district}, {info.ward}</p>
    </div>
  }

  // Back to home page
  const continueShopping = () => {
    navigate('/')
  }

  return (
    <div className={`address-modal-layer ${isShowing ? '' : 'opacity-0 pointer-events-none'}`}>
      <div className='order-success-modal flex items-center text-13'>
        <img src={Check}
          alt='Order Succeeded'
          className='w-16 h-16' />

        <h1 className='font-bold text-xl text-center mt-5'>
          Success
        </h1>

        <p>
          Thanks for your order.
        </p>

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
              <p>Order Detail</p>
            </div>

            {/* Right section */}
            <div className='font-semibold space-y-3 text-right'>
              <p>$1234</p>
              <Link to='/profile/orders/123456'
                className='text-blue-primary block cursor-pointer'>
                #123456
              </Link>
            </div>
          </div>


          {/* Delivery Info */}
          <div className='mt-3'>
            <p> Delivery Info</p>
            {getDeliveryInfo(sampleDeliveryInfo)}
          </div>
        </div>

        <button type='button'
          className='w-full bg-primary text-white rounded-md text-[11px] py-3 mt-8 hover:bg-opacity-90 transition duration-300'
          onClick={() => continueShopping()}>
          CONTINUE SHOPPING
        </button>
      </div>
    </div>
  )
}

export default OrderSuccessModal