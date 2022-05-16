import React, { useEffect, useRef, useState } from 'react'
import CategoryBar from '../components/CategoryBar'
import ProductContainer from '../components/ProductContainer'

// category tuple
const categories = ['Featured', 'Combos', 'Hamburgers', 'Chicken', 'Rice', 'Sides', 'Desserts', 'Drinks']

const Menu = () => {
  // Create state: current selected category
  const [currCategory, setCategory] = useState('Featured');

  const [isVisible, setIsVisible] = useState(categories.map((c, index) => index === 0))

  useEffect(() => {
    const index = isVisible.indexOf(true)
    if (index !== -1)
      setCategory(categories[index])
    // console.log(isVisible)
  }, [isVisible])

  return (
    <div className='md:flex pt-10 px-2 md:px-16 xl:px-32 justify-between gap-x-10 sm:gap-x-20 lg:gap-x-32 xl:gap-x-44'>
      <aside className='h-screen sticky top-24 hidden md:block'>
        <CategoryBar currCategory={currCategory} setCategory={setCategory} categories={categories} />
      </aside>

      <div className='w-full'>
        <ProductContainer isVisible={isVisible} setIsVisible={setIsVisible} categories={categories} />
      </div>
    </div>
  )
}

export default Menu