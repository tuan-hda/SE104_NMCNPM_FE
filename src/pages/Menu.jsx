import React, { useEffect, useState } from 'react'
import CategoryBar from '../components/CategoryBar'
import ProductContainer from '../components/ProductContainer'

// category tuple
const categories = ['Featured', 'Combos', 'Hamburgers', 'Chicken', 'Rice', 'Sides', 'Desserts', 'Drinks']

const Menu = () => {
  // Create state: current selected category
  const [currCategory, setCategory] = useState('Featured');

  const [isVisible, setIsVisible] = useState(categories.map((c, index) => index === 0))

  // Control sidebar in small device
  const [isShowing, toggle] = useState(false);

  useEffect(() => {
    const index = isVisible.indexOf(true)
    if (index !== -1)
      setCategory(categories[index])
    // console.log(isVisible)
  }, [isVisible])

  return (
    <div className='md:flex px-2 pt-4 md:pt-0 sm:px-8 md:px-16 xl:px-32 justify-between gap-x-10 sm:gap-x-20 lg:gap-x-32 xl:gap-x-44'>

      <button className='text-white font-semibold fixed top-20 bg-black hover:black w-full left-0 hover:bg-gray-800 transition duration-300 pl-2 h-10 z-10 md:hidden'
        onClick={() => toggle(!isShowing)}>
        {isShowing ? 'CLOSE' : 'MENU'}
      </button>

      {/* Normal sidebar */}
      <aside className='h-screen sticky top-24 hidden md:block'>
        <CategoryBar currCategory={currCategory} setCategory={setCategory} categories={categories} />
      </aside>

      {/* Sidebar on small devices */}
      <aside className={`fixed md:hidden bg-opacity-40 left-0 w-full ${isShowing ? '' : '-translate-y-full'} z-0 justify-center transition-transform h-full flex duration-300`}>
        <div className='bg-opacity-100 bg-white w-4/5 sm:w-3/5 h-fit flex justify-center p-5 rounded-lg shadow-2xl'>
          <CategoryBar currCategory={currCategory} setCategory={setCategory} categories={categories} />
        </div>
      </aside>

      <div className='w-full mt-4 md:mt-0'>
        <ProductContainer isVisible={isVisible} setIsVisible={setIsVisible} categories={categories} />
      </div>
    </div>
  )
}

export default Menu