import React from 'react'
import ProductThumb from './ProductThumb'

// This component generate a list of products that belong to a specified category
const ProductsByCategory = ({ category, productData, myRef, index }) => {
  return (
    <div className='mb-20' ref={(ref) => { myRef[index] = ref }}>
      {/* title */}
      <h1 className='text-34 font-extrabold'>{category}</h1>

      {/* divider */}
      <div className='border-t-[1px] border-[#ABABAB] mt-2' />

      {/* products */}
      <div className='grid mt-6 grid-cols-3 gap-y-6 justify-between gap-x-8'>
        {productData.map((p, i) => {
          return <ProductThumb key={i} product={p} />
        })}
      </div>
    </div>
  )
}

export default ProductsByCategory