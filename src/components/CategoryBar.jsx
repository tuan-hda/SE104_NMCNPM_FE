import React from 'react'

const CategoryBar = () => {
  return (
    <div>
      <h1 className='text-34 font-extrabold'>MENU</h1>
      <nav>
        <ul className='mt-5 space-y-6 text-lg'>
          <li className='font-bold'>Featured</li>
          <li>Combos</li>
          <li>Hamburgers</li>
          <li>Chicken</li>
          <li>Rice</li>
          <li>Sides</li>
          <li>Desserts</li>
          <li>Drinks</li>
        </ul>
      </nav>
    </div>
  )
}

export default CategoryBar