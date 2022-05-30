import React from 'react'

const NotFound = () => {
  return (
    <div className='w-full h-screen absolute z-20 bg-white top-0 flex justify-center items-center flex-col'>
      <strong className='text-[100px]'>404</strong>
      <div>The page you are looking for is not exist or you don't have permission to access it.</div>
    </div>
  )
}

export default NotFound