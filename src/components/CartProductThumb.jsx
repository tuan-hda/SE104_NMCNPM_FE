import React from 'react'
import { Link } from 'react-router-dom'

const CartProductThumbnail = ({ itemData }) => {
  return (
    <Link
      to={`/menu/product/${itemData.product.id}`}
      state={itemData.product}
      className='col-span-3 place-self-start'
    >
      <div className='grid grid-cols-3 h-24 gap-3'>
        {/* Product Image */}
        <div className='bg-gray-thumb rounded-lg w-[120px] grid'>
          <img
            src={itemData.product.itemImage}
            alt='Product Thumbnail'
            className=' w-4/5 object-contain place-self-center'
          />
        </div>
        {/* Product Info */}
        <div className='grid place-self-start h-full grid-rows-4 text-15 place-content-center col-span-2'>
          <h6 className='font-semibold row-span-2'>
            {itemData.product.itemName}
          </h6>
          <h6>{'Calories: ' + itemData.product.calories}</h6>
          <h6 className='text-primary font-semibold places'>
            {'$' + itemData.product.price}
          </h6>
        </div>
      </div>
    </Link>
  )
}

export default CartProductThumbnail
