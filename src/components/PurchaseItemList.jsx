import React, { useEffect, useState } from 'react'
import * as routes from '../api/apiRoutes'
import appApi from '../api/appApi'
import round2digits from '../utils/round2digits'
import LoadingScreen from './LoadingScreen'
import PurchaseItemThumb from './PurchaseItemThumb'

const PurchaseItemList = ({ currentUser, setInfo }) => {
  const [loading, setLoading] = useState(false)
  const [items, setItems] = useState([])

  const fetchCart = async () => {
    setLoading(true)
    try {
      const token = await currentUser.getIdToken()

      let result = await appApi.get(
        routes.DISPLAY_CART_ITEM,
        routes.getAccessTokenHeader(token)
      )

      setItems(result.data.cartItems)
      console.log(result.data.cartItems)

      setInfo(prev => ({
        ...prev,
        subtotal: calculateSubtotal(result.data.cartItems),
        deliveryFee: 1,
        discount: caculateDiscount(result.data.cartItems)
      }))
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  const caculateDiscount = data => {
    if (!Array.isArray(data)) return
    return round2digits(
      calculateSubtotal(data) -
        data.reduce((total, curr) => total + curr.totalPricePromo, 0)
    )
  }

  const calculateSubtotal = data => {
    if (!Array.isArray(data)) return
    return data.reduce(
      (total, curr) => total + curr.product.price * curr.number,
      0
    )
  }

  useEffect(() => {
    if (currentUser) fetchCart()
  }, [currentUser])

  if (loading) return <LoadingScreen />

  return (
    <div>
      {Array.isArray(items) &&
        items.map((item, index) => (
          <PurchaseItemThumb key={index} itemData={item} />
        ))}
    </div>
  )
}

export default PurchaseItemList
