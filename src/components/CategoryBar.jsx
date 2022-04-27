import React from 'react'

const CategoryBar = ({ currCategory, setCategory, categories, myRef }) => {
  const categoryClick = (c, i) => {
    setCategory(c);
    myRef[i].scrollIntoView({
      behavior: 'smooth',
    })
  }

  return (
    <div className='w-32'>
      <h1 className='text-34 font-extrabold'>MENU</h1>
      <nav>
        <ul className='mt-5 space-y-6 text-lg'>
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