import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import * as routes from '../api/apiRoutes'
import appApi from '../api/appApi'
import { VscInbox } from 'react-icons/vsc'
import { AiOutlineSearch } from 'react-icons/ai'
import LoadingScreen from './LoadingScreen'
import round2digits from '../utils/round2digits'

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
      return 'text-[#009D34]'
    case 4:
      return 'text-[#FF0000]'
    default:
      return ''
  }
}

const OrdersContainer = () => {
  const [orders, setOrders] = useState([])
  const [originOrders, setOriginOrders] = useState([])
  const [loading, setLoading] = useState(false)
  const [searchValue, setSearchValue] = useState('')
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
      console.log(result.data.orders)
      setOrders(result.data.orders)
      setOriginOrders(result.data.orders)
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  const getPaymentStatus = value => {
    if (!value) return 'Cash'
    else return 'Paid'
  }

  const reformatDate = date => {
    const str = date.split('-')
    return str[2] + '-' + str[1] + '-' + str[0]
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  const handleFilter = e => {
    const value = e.target.value
    setSearchValue(value)
    setOrders(
      originOrders.filter(
        o =>
          String(o.id).toLowerCase().includes(value) ||
          reformatDate(o.date.substring(0, 10)).toLowerCase().includes(value) ||
          String(o.total).toLowerCase().includes(value) ||
          getDeliveryStatus(o.billstatus).toLowerCase().includes(value) ||
          getPaymentStatus(o.payment).toLowerCase().includes(value)
      )
    )
  }

  return (
    <div className='mb-10'>
      <LoadingScreen loading={loading} />

      {/* This is the header. Including: Title, description */}
      <div className='mb-11'>
        <h1 className='text-32 font-bold'>Orders</h1>
        <p className='mt-2 text-sm'>Your orders will be displayed here.</p>
      </div>
      {originOrders.length ? (
        <div className='overflow-y-auto'>
          {/* Search */}
          <div className='relative'>
            <input
              type='text'
              className='outline-0 border-[1px] border-gray-border mb-8 rounded-md w-full text-sm py-2 pr-4 pl-8'
              value={searchValue}
              name='searchValue'
              placeholder='Search by id, date, total, status, payment'
              onChange={handleFilter}
            />
            <AiOutlineSearch className='absolute top-3 left-2' />
          </div>

          {/* Order list */}

          <table className='text-sm font-medium md:w-full w-[640px] sm:w-[768px]'>
            <colgroup>
              <col span='1' width='15%' />
              <col span='1' width='20%' />
              <col span='1' width='20%' />
              <col span='1' width='20%' />
              <col span='1' width='15%' />
            </colgroup>
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
                      <td className='text-primary'>
                        {'$ ' + round2digits(o.total)}
                      </td>
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
        <div className='flex items-center justify-center flex-col gap-2'>
          <VscInbox className='text-3xl' />
          <p>You haven't ordered anything yet.</p>
        </div>
      )}
    </div>
  )
}

export default OrdersContainer
