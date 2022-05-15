import React from 'react'
import SearchIcon from '../images/SearchIcon.svg'

const Search = () => {
  return (
    <>
        <input className='outline-0 border-[1px] w-30 h-11 placeholder-black-placeholder
            border-gray-border rounded-full px-5 py-4'/>
        <button className='mr-4'>
            <img src={SearchIcon} alt="Search" className='w-7 h-7'/>
        </button>
    </>
  )
}

export default Search