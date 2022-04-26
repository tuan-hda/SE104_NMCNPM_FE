import React from 'react'
import ProductThumb from './ProductThumb'
import productThumb from '../images/ProductThumbImage.png'

const productData = [
  {
    image: productThumb,
    title: 'Hamburgers And Chips Meal',
    calories: 6750,
    price: 59.99
  },
  {
    image: productThumb,
    title: 'Hamburgers And Chips Meal',
    calories: 6750,
    price: 59.99
  },
  {
    image: productThumb,
    title: 'Hamburgers And Chips Meal',
    calories: 6750,
    price: 59.99
  },
  {
    image: productThumb,
    title: 'Hamburgers And Chips Meal',
    calories: 6750,
    price: 59.99
  },
  {
    image: productThumb,
    title: 'Hamburgers And Chips Meal',
    calories: 6750,
    price: 59.99
  },
  {
    image: productThumb,
    title: 'Hamburgers And Chips Meal',
    calories: 6750,
    price: 59.99
  },
  {
    image: productThumb,
    title: 'Hamburgers And Chips Meal',
    calories: 6750,
    price: 59.99
  },
  {
    image: productThumb,
    title: 'Hamburgers And Chips Meal',
    calories: 6750,
    price: 59.99
  },
  {
    image: productThumb,
    title: 'Hamburgers And Chips Meal',
    calories: 6750,
    price: 59.99
  },
  {
    image: productThumb,
    title: 'Hamburgers And Chips Meal',
    calories: 6750,
    price: 59.99
  },
]



const ProductContainer = () => {
  return (
    <div>
      {/* title */}
      <h1 className='text-34 font-extrabold'>FEATURED</h1>

      {/* divider */}
      <div className='border-t-[1px] border-[#ABABAB] mt-2' />

      {/* products */}
      <div className='grid mt-6 grid-cols-3 gap-y-6 justify-between gap-x-8'>
        {productData.map(p => {
          return <ProductThumb product={p} />
        })}
      </div>
    </div>
  )
}

export default ProductContainer