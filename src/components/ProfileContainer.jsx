import React, { useState } from 'react'
import MakimaAva from '../images/Makima.jpg'

const ProfileContainer = () => {
  const [detail, setDetail] = useState({});

  return (
    <div>
      {/* Header of profile */}
      <div className='flex items-center relative'>
        {/* User's avatar goes here */}
        <div className='rounded-full shadow-circle w-[184px] h-[184px] flex justify-center items-center'>
          <div>
            <img src={MakimaAva} alt="Sample Avatar"
              className='rounded-full w-44 h-44' />
          </div>
        </div>

        {/* Including Title, description */}
        <div className='ml-9'>
          <h1 className='font-bold text-32'>Profile</h1>
          <p className='text-sm mt-2'>Update your photo and personal details.</p>
        </div>

        <button className='save-button'>Save</button>
      </div>

      <div className='flex mt-16 justify-between text-sm font-semibold items-center'>
        <p className='w-36'>Your name</p>

        <input type='text' className='profile-input' />
      </div>
    </div>
  )
}

export default ProfileContainer