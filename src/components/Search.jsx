import React from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import SearchIcon from '../images/SearchIcon.svg'

const Search = () => {
  const navigate = useNavigate()

  // Handle submit of search input here
  const handleSubmit = e => {
    e.preventDefault()
    if (e.target[0].value === '') navigate('/menu')
    else navigate('/menu/search?name=' + e.target[0].value)
  }

  return (
    <form className='flex gap-x-2' onSubmit={handleSubmit}>
      <input
        className='outline-0 border-[1px] w-full md:mx-0 mx-2 h-11 placeholder-black-placeholder
            border-gray-border rounded-full px-5 py-4'
      />
      <button className='md:block hidden'>
        <img src={SearchIcon} alt='Search' className='w-7 h-7' />
      </button>
    </form>
  )
}

export default Search
