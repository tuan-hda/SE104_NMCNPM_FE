import React from 'react'
import { useNavigate } from 'react-router-dom';

const divider = <tr className='border-t-[1px] border-[#F0F0F0] w-full' height='6px' />

const orderListData = [
  {
    orderID: '123456',
    purchaseDate: '12/04/2022',
    total: '324',
    status: 2,
    payment: 0
  },
  {
    orderID: '123451',
    purchaseDate: '13/04/2022',
    total: '314',
    status: 1,
    payment: 1
  },
  {
    orderID: '123451',
    purchaseDate: '13/04/2022',
    total: '314',
    status: 0,
    payment: 0
  }
]

// get delivery status based on status code
const getDeliveryStatus = (code) => {
  switch (code) {
    case 0:
      return 'In Progress';
    case 1:
      return 'Cancelled';
    case 2:
      return 'Delivered';
    default:
      return 'Unknown';
  }
}

// Get text color based on status code 
const getTextColor = (code) => {
  switch (code) {
    case 0: return 'text-[#FFC107]';
    case 1: return 'text-[#FF0000]';
    case 2: return 'text-[#009D34]';
    default:
      return ''
  }
}

const OrdersContainer = () => {
  const navigate = useNavigate();

  // handle when user click at orderID
  const handleClick = (orderID) => {
    navigate('/profile/orders/' + orderID)
  }

  return (
    <div className='mb-10'>
      {/* This is the header. Including: Title, description */}
      <div>
        <h1 className='text-32 font-bold'>Orders</h1>
        <p className='mt-2 text-sm'>Your orders will be displayed here.</p>
      </div>

      {/* Order list */}
      <table className='text-sm mt-11 font-medium w-full'>
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
          {
            orderListData.map((o, i) => {
              return <React.Fragment key={i} >
                {divider}
                <tr className='font-medium' height='40px'>
                  <td
                    className='text-[#1976D2] cursor-pointer hover:underline'
                    onClick={() => handleClick(o.orderID)}>
                    {'#' + o.orderID}
                  </td>
                  <td>{o.purchaseDate}</td>
                  <td>{'$ ' + o.total}</td>
                  <td className={getTextColor(o.status)}>{getDeliveryStatus(o.status)}</td>
                  <td>{o.payment ? 'Paid' : 'Cash'}</td>
                </tr>
              </React.Fragment>
            })
          }
        </tbody>
      </table>
    </div>
  )
}

export default OrdersContainer