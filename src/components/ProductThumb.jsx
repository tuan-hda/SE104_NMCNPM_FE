import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { addToCart } from '../actions/cart-actions'
import * as routes from '../api/apiRoutes'
import appApi from '../api/appApi'

// This component return a product detail including:
// product image, title, calories, price
const ProductThumb = ({ product }) => {
  const { currentUser } = useSelector(state => state.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleOrderClick = e => {
    e.stopPropagation()
    e.preventDefault()
    handleAddToCart()
  }

  const handleAddToCart = async () => {
    if (!currentUser) navigate('/signin')
    try {
      const token = await currentUser.getIdToken()

      await appApi.post(
        routes.ADD_ITEM_TO_CART,
        routes.getAddCartBody(product.id, 1),
        routes.getAccessTokenHeader(token)
      )

      dispatch(addToCart(1))
    } catch (err) {
      console.log(err)
    }
  }

  return !product.available ? null : (
    <div className='text-13'>
      <Link to={`/menu/product/${product.id}`} state={product}>
        {/* Image */}
        <div className='bg-gray-thumb rounded-lg'>
          <img
            src={product.itemImage}
            alt={product.itemName}
            className='w-full aspect-square object-cover'
          />
        </div>

        {/* Title, calories, price and add to cart button */}
        <div className='flex justify-between sm:items-center mt-4 flex-col sm:flex-row'>
          <div>
            <h2 className='font-semibold'>{product.itemName}</h2>
            <p className='mt-0.5'>Calories: {product.calories}</p>
            <p className='mt-0.5'>
              {product.pricePromo !== product.price && (
                <span className='mr-4 line-through'>
                  $ {product.pricePromo}
                </span>
              )}
              <span className='font-bold text-red-500'>
                $ {product.pricePromo}
              </span>
            </p>
          </div>

          <button
            className='p-3 sm:p-2 w-full mt-2 sm:mt-0 sm:w-fit bg-red-500 flex items-center rounded-md text-white 
          font-medium hover:bg-red-600 transition duration-300 justify-center'
            onClick={handleOrderClick}
          >
            Order
          </button>
        </div>
      </Link>
    </div>
  )
}

export default ProductThumb
