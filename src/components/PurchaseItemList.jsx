import React, { useEffect, useState } from 'react'
import * as routes from '../api/apiRoutes'
import appApi from '../api/appApi'
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

      setInfo(prev => ({
        ...prev,
        subtotal: calculateSubtotal(result.data.cartItems),
        deliveryFee: 20000
      }))
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
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
