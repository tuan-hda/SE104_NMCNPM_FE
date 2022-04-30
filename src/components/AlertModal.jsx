import React from 'react'

const AlertModal = ({ msg, isShowing, hide }) => {
  return <div
    className={`${!isShowing ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto'} 
    duration-300 transition-opacity fixed top-0 left-0 w-screen h-screen flex justify-center
    items-center bg-opacity-70 bg-gray-500 text-sm z-10`}>
    <div className='bg-white rounded-md w-96 h-64 flex items-center justify-center relative'>
      {/* Alert icon */}
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
        className='w-16 h-16 object-scale-down absolute top-6 fill-amber-600 opacity-60'><g id="_01_align_center" data-name="01 align center">
          <path d="M12,24A12,12,0,1,1,24,12,12.013,12.013,0,0,1,12,24ZM12,2A10,10,0,1,0,22,12,10.011,10.011,0,0,0,12,2Z" /><rect x="11" y="5" width="2" height="10" /><rect x="11" y="17" width="2" height="2" /></g></svg>

      {/* Message */}
      <p className='text-lg text-center px-10 pt-6'>{msg}</p>

      {/* Buttons */}
      <div className='flex items-center absolute bottom-6 gap-4'>
        <button onClick={hide} className='font-semibold rounded-md bg-gray-200 p-2 px-4 hover:bg-opacity-60 transition duration-300'>Cancel</button>
        <button onClick={hide} className='font-semibold rounded-md bg-primary p-2 px-5 text-white hover:bg-opacity-80 transition duration-300'>OK</button>
      </div>
    </div>
  </div>
}


export default AlertModal