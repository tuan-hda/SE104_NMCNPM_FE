import React from 'react'

const CategoryBar = ({ currCategory, setCategory, categories }) => {
  const categoryClick = (c, i) => {
    var element = document.getElementById(`menu${i}`)
    const headerOffset = 96;
    var offsetTop = element.getBoundingClientRect().top + window.pageYOffset - headerOffset
    window.scrollTo({
      top: offsetTop,
      behavior: 'smooth'
    })

  }

  return (
    <div className='w-32'>
      {/* Menu Title */}
      <h1 className='text-34 font-extrabold'>MENU</h1>

      {/* Side category bar */}
      <nav>
        <ul className='mt-5 space-y-7 text-md'>
          {categories.map((c, i) => <li
            className={currCategory === c ? 'cursor-pointer font-bold' : 'cursor-pointer hover:font-semibold'}
            key={i}
            onClick={() => categoryClick(c, i)}>
            {c}
          </li>)}
        </ul>
      </nav>
    </div>
  )
}

export default CategoryBar