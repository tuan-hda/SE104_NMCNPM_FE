import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import * as routes from '../api/apiRoutes'
import appApi from '../api/appApi'
import { VscInbox } from 'react-icons/vsc'

const divider = (
  <tr className='border-t-[1px] border-[#F0F0F0] w-full' height='6px' />
)

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
const getTextColor = code => {
  switch (code) {
    case 1:
      return 'text-[#FFC107]'
    case 2:
      return 'text-[#0086FF]'
    case 3:
      return 'text-[#FF0000]'
    case 4:
      return 'text-[#009D34]'
    default:
      return ''
  }
}

const OrdersContainer = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { currentUser } = useSelector(state => state.user)

  // handle when user click at orderID
  const handleClick = order => {
    navigate('/profile/orders/' + order, { state: order })
  }

  const fetchOrders = async () => {
    setLoading(true)
    try {
      const token = await currentUser.getIdToken()
      const result = await appApi.get(
        routes.GET_ALL_ORDERS,
        routes.getAccessTokenHeader(token)
      )
      console.log(result.data)
      setOrders(result.data.orders)
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  const reformatDate = date => {
    const str = date.split('-')
    return str[2] + '-' + str[1] + '-' + str[0]
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  return (
    <div className='mb-10'>
      {/* This is the header. Including: Title, description */}
      <div className='mb-11'>
        <h1 className='text-32 font-bold'>Orders</h1>
        <p className='mt-2 text-sm'>Your orders will be displayed here.</p>
      </div>

      {orders.length ? (
        // Order list here
        <div className='overflow-y-auto'>
          {/* Order list */}
          <table className='text-sm font-medium md:w-full w-[640px] sm:w-[768px]'>
            <thead>
              <tr className='font-semibold text-left' height='40px'>
                <th>Order ID</th>
                <th>Purchase date</th>
                <th>Total</th>
                <th>Status</th>
                <th>Payment</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((o, i) => {
                return (
                  <React.Fragment key={i}>
                    {divider}
                    <tr className='font-medium' height='40px'>
                      <td
                        className='text-[#1976D2] cursor-pointer hover:underline'
                        onClick={() => handleClick(o)}
                      >
                        {'#' + o.id}
                      </td>
                      <td>{reformatDate(o.date.substring(0, 10))}</td>
                      <td>{'$ ' + o.total}</td>
                      <td className={getTextColor(o.billstatus)}>
                        {getDeliveryStatus(o.billstatus)}
                      </td>
                      <td>{o.payment ? 'Paid' : 'Cash'}</td>
                    </tr>
                  </React.Fragment>
                )
              })}
            </tbody>
          </table>
        </div>
      ) : (
        // Show if order list is empty
        <div className='flex items-center justify-center flex-col gap-2'>
          <VscInbox className='text-3xl' />
          <p>You haven't ordered anything yet.</p>
        </div>
      )}
    </div>
  )
}

export default OrdersContainer
