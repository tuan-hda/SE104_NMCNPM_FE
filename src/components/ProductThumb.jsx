import React from 'react'
import { Link } from 'react-router-dom'

// This component return a product detail including: 
// product image, title, calories, price
const ProductThumb = ({ product }) => {


  const handleOrderClick = (e) => {
    
  }
  
  //Convert product's title for product detail link
  const convertedTitle = product.title.trim().replace(/\s+/g, '-').toLowerCase();

  return (<div className='text-13'>
    <Link to={`/product/${convertedTitle}`} state={product}>

      {/* Image */}
      <div className='bg-gray-thumb rounded-lg'>
        <img src={product.image} alt='Product Thumbnail' className='w-full object-contain' />
      </div>

      {/* Title, calories, price and add to cart button */}
      <div className='flex justify-between items-center mt-4'>
        <div>
          <h2 className='font-semibold'>{product.title}</h2>
          <p className='mt-0.5'>Calories: {product.calories}</p>
          <p className='font-bold mt-0.5 text-red-500'>${product.price}</p>
        </div>

        <button
          className='p-2 bg-red-500 flex items-center rounded-md text-white 
          font-medium hover:bg-red-600 transition duration-300'
          onClick={handleOrderClick}>
          Order
        </button>
      </div>
    </Link>
  </div>
  )
}

export default ProductThumb