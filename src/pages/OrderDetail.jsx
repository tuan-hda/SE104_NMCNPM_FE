import React, { useState, useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import CartItemList from '../components/CartItemList'
import status_payed from '../images/order_status/payed.png'
import arrowIcon from '../images/back-arrow.svg'
import api from '../api/appApi'
import * as routes from '../api/apiRoutes'
import { hambursyLoader } from '../components/LoadingScreen'
import round2digits from '../utils/round2digits'

const OrderDetail = () => {
  const { currentUser } = useSelector(state => state.user)
  const [loading, setLoading] = useState(true)
  const [items, setItems] = useState([])
  //Get order from profile/orders
  const location = useLocation()
  const orderData = location.state
  console.log(orderData)

  const getAddress = () => {
    const detail = orderData.deliAddress
    const ward = orderData.deliWard.slice(orderData.deliWard.indexOf('_') + 1)
    const district = orderData.deliDistrict.slice(
      orderData.deliDistrict.indexOf('_') + 1
    )
    const province = orderData.deliProvince.slice(
      orderData.deliProvince.indexOf('_') + 1
    )
    return detail + ', ' + ward + ', ' + district + ', ' + province
  }

  // get delivery status based on status code
  const getDeliveryStatus = code => {
    switch (code) {
      case 1:
        return 'Pending'
      case 2:
        return 'In progress'
      case 3:
        return 'Delivered'
      case 4:
        return 'Canceled'
      default:
        return 'Unknown'
    }
  }

  // Get text color based on status code
  const getBtnColor = code => {
    switch (code) {
      case 1:
        return 'bg-[#FFC107]'
      case 2:
        return 'bg-[#0086FF]'
      case 3:
        return 'bg-[#009D34]'
      case 4:
        return 'bg-[#FF0000]'
      default:
        return ''
    }
  }

  const fetchCart = async () => {
    try {
      const token = await currentUser.getIdToken()
      const result = await api.get(routes.DISPLAY_ORDER_ITEM, {
        headers: {
          Authorization: 'Bearer ' + token
        },
        params: {
          id: orderData.id
        }
      })
      const cart = result.data.items.map((item, index) => ({
        ...item,
        product: item.Item,
        key: index
      }))
      console.log(result.data.items)
      setItems(cart)
    } catch (err) {
      if (err.response) {
        console.log(err.response.data)
        console.log(err.response.status)
        console.log(err.response.headers)
      } else {
        console.log(err.message)
      }
    } finally {
      setLoading(false)
    }
  }

  const originTotal = () => {
    console.log(items)
    let result = 0
    for (let i = 0; i < items.length; i++) {
      result +=
        (items[i].Item.pricePromo
          ? items[i].Item.pricePromo
          : items[i].Item.price) * items[i].number
    }
    return result
  }

  useEffect(() => {
    fetchCart()
  }, [])

  if (loading)
    return (
      <div className='w-full h-[75%] flex items-center justify-center'>
        {hambursyLoader}
      </div>
    )

  const calculateTotal = items => {
    if (!items || !Array.isArray(items) || !items.length) return
    return items.reduce((prev, curr) => prev + curr.currentprice, 1)
  }

  return (
    <div className='px-32 py-6'>
      {/* Title */}
      <h1 className='text-34 font-extrabold'>Order Detail</h1>
      <div className='flex gap-16'>
        {/* Left section */}
        <div className=' w-2/3 text-15'>
          {/* Delivery Information */}
          <div className='w-full mt-10 border-2 border-[#CFCFCF] rounded-xl mb-10'>
            <div className='flex justify-between items-start p-5 gap-x-4'>
              {/* Order detail */}
              <div className='flex flex-col space-y-2 w-1/4'>
                <h2>
                  Order #<span className='font-semibold'>{orderData.id}</span>
                </h2>
                <h2>
                  {'Purchase date: ' +
                    orderData.date.slice(0, orderData.date.indexOf('T'))}
                </h2>
                <button
                  className={`${getBtnColor(
                    orderData.billstatus
                  )} w-36 h-6 rounded-sm text-13 text-white font-semibold`}
                >
                  {getDeliveryStatus(orderData.billstatus)}
                </button>
              </div>
              {/* Delivery Address */}
              <div className='w-2/4'>
                <h3 className='font-semibold'>Delivery Address</h3>
                <h6>{orderData.name}</h6>
                <h6>{'Phone number: ' + orderData.deliPhoneNum}</h6>
                <h6>{getAddress()}</h6>
              </div>
              {/* Payment Method */}
              <div className='space-y-2'>
                <h3 className='font-semibold'>Payment method:</h3>
                <h6>{orderData.payment ? 'Paid' : 'Cash'}</h6>
              </div>
            </div>
          </div>
          {/* Item list*/}
          <CartItemList cart={items} prop='' isEditable={false} />
        </div>
        {/* Right section */}
        <div className='flex-grow'>
          {/* Bill */}
          <div className='border-[1px] border-[#CFCFCF] rounded-2xl h-fit mt-10'>
            <div className='flex items-center gap-3 p-5'>
              {orderData.payment && (
                <img src={status_payed} alt='Payed' className=' w-16' />
              )}
              <h2 className='font-semibold text-22'>Paid Info</h2>
            </div>
            {/* Divider */}
            <div className='border-t-[1px] border-[#CFCFCF] flex-grow' />
            {/* Total */}
            <div className='p-5'>
              {/* Subtotal */}
              <div className='flex justify-between py-4'>
                <h5>Subtotal</h5>
                <h5>{'$' + round2digits(originTotal())}</h5>
              </div>
              {/* Discount */}
              <div className='flex justify-between py-4'>
                <h5>Discount</h5>
                <h5>
                  $
                  {Number(
                    (originTotal() - calculateTotal(items) + 1).toFixed(2)
                  )}
                </h5>
              </div>
              {/* Estimated total */}
              <div className='flex justify-between py-4'>
                <h5>Estimated total</h5>
                <h5>{'$' + Number((calculateTotal(items) - 1).toFixed(2))}</h5>
              </div>
              {/* Delivery fee */}
              <div className='flex justify-between py-4'>
                <h5>Delivery fee</h5>
                <h5>{'$' + orderData.ship}</h5>
              </div>
              {/* Total */}
              <div className='flex justify-between py-4'>
                <h5 className='font-semibold'>Total</h5>
                <h5 className='font-semibold'>{'$' + calculateTotal(items)}</h5>
              </div>
            </div>
          </div>

          {/* Back to Order History */}
          <Link to='/profile/orders'>
            <div className='flex gap-2 items-center mt-5 justify-end'>
              <img src={arrowIcon} alt='Back to Order History' />
              <h5 className='font-medium text-primary'>Order History</h5>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default OrderDetail
