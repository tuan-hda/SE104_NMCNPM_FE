import React from 'react'
import { Link } from 'react-router-dom'

// This component return a product detail including: 
// product image, title, calories, price
const ProductThumb = ({ product }) => {
  const handleOrderClick = (e) => {
    e.stopPropagation()
    e.preventDefault()
  }

  return (
    !product.available ?
      null
      :
      <div className='text-13'>
        <Link to={`/menu/product/${product.id}`} state={product}>

          {/* Image */}
          <div className='bg-gray-thumb rounded-lg'>
            <img src={product.itemImage} alt={product.itemName} className='w-full object-contain' />
          </div>

          {/* Title, calories, price and add to cart button */}
          <div className='flex justify-between sm:items-center mt-4 flex-col sm:flex-row'>
            <div>
              <h2 className='font-semibold'>{product.itemName}</h2>
              <p className='mt-0.5'>Calories: {product.calories}</p>
              <p className='font-bold mt-0.5 text-red-500'>${product.price}</p>
            </div>

            <button
              className='p-3 sm:p-2 w-full mt-2 sm:mt-0 sm:w-fit bg-red-500 flex items-center rounded-md text-white 
          font-medium hover:bg-red-600 transition duration-300 justify-center'
              onClick={handleOrderClick}>
              Order
            </button>
          </div>
        </Link>
      </div>
  )
}

export default ProductThumb