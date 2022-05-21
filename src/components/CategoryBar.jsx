import React from 'react'

const CategoryBar = ({ currCategory, categories, hide }) => {
  const categoryClick = (c, i) => {
    var element = document.getElementById(`menu${i}`)
    const headerOffset = 120;
    var offsetTop = element.getBoundingClientRect().top + window.pageYOffset - headerOffset
    window.scrollTo({
      top: offsetTop,
      behavior: 'smooth'
    })
    // Hide if category bar is showing (on small devices)
    if (hide) {
      hide()
    }
  }

  return (
    <div className='w-32'>
      {/* Menu Title */}
      <h1 className={`text-34 font-extrabold text-center md:text-left`}>MENU</h1>

      {/* Side category bar */}
      <nav>
        <ul className={`mt-5 space-y-7 text-md text-center md:text-left`}>
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