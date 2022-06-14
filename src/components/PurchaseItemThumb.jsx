import React from 'react'
import { Link } from 'react-router-dom'
import round2digits from '../utils/round2digits'

const PurchaseItemThumb = ({ itemData }) => {
  return (
    <Link
      to={`/menu/product/${itemData.product.id}`}
      state={itemData.product}
      className='mt-4 block'
    >
      <div className='flex items-center h-[120px] gap-4'>
        {/* Product Image */}
        <div className='bg-gray-thumb rounded-lg w-[120px] grid'>
          <img
            src={itemData.product.itemImage}
            alt='Product Thumbnail'
            className='object-cover aspect-square'
          />
        </div>
        {/* Product Info */}
        <div className='flex flex-col justify-between font-semibold h-full text-sm flex-1 p-2 pr-0'>
          <h6 className='row-span-2 font-bold'>{itemData.product.itemName}</h6>
          <div className='flex justify-between'>
            <h6 className='text-blue-primary'>{itemData.number}</h6>
            <h6 className=''>
              {'$' + round2digits(itemData.product.price * itemData.number)}
            </h6>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default PurchaseItemThumb
