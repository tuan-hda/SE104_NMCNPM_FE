import React, { useRef, useState } from 'react'
import CategoryBar from '../components/CategoryBar'
import ProductContainer from '../components/ProductContainer'

// category tuple
const categories = ['Featured', 'Combos', 'Hamburgers', 'Chicken', 'Rice', 'Sides', 'Desserts', 'Drinks']

const Menu = () => {
  // Create state: current selected category
  const [currCategory, setCategory] = useState('Featured');

  // Create ref 
  const myRef = useRef([]);

  return (
    <div className='flex pt-10 px-32'>
      <aside className='h-screen sticky top-0'>
        <CategoryBar currCategory={currCategory} setCategory={setCategory} categories={categories} myRef={myRef} />
      </aside>

      <div className='w-full ml-[186px]'>
        <ProductContainer categories={categories} myRef={myRef} />
      </div>
    </div>
  )
}

export default Menu