import React from 'react'

const ProductThumb = ({ product }) => {
  return (<div className='text-13'>
    {/* Image */}
    <div className='bg-gray-thumb rounded-lg'>
      <img src={product.image} alt='Product Thumbnail' className='w-full' />
    </div>

    {/* Title, calories and price */}
    <div>
      <h2 className='font-semibold mt-4'>{product.title}</h2>
      <p className='mt-0.5'>Calories: {product.calories}</p>
      <p className='font-bold mt-0.5 text-red-500'>${product.price}</p>
    </div>
  </div>
  )
}

export default ProductThumb