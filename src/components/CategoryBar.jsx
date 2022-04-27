import React from 'react'

const CategoryBar = ({ currCategory, setCategory, categories, myRef }) => {
  const categoryClick = (c, i) => {
    setCategory(c);
    myRef[i].scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  }

  return (
    <div className='w-32'>
      <h1 className='text-34 font-extrabold'>MENU</h1>
      <nav>
        <ul className='mt-5 space-y-6 text-lg'>
          {categories.map((c, i) => <li
            className='cursor-pointer'
            style={{ fontWeight: c === currCategory ? 'bold' : 'normal' }}
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