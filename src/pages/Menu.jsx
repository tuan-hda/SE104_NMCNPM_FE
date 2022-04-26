import React from 'react'
import CategoryBar from '../components/CategoryBar'
import ProductContainer from '../components/ProductContainer'

const Menu = () => {
  return (
    <div className='flex pt-10 px-32'>
      <div>
        <CategoryBar />
      </div>

      <div className='w-full ml-48'>
        <ProductContainer />
      </div>
    </div>
  )
}

export default Menu