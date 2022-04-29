import React, { useState } from 'react'
import MakimaAva from '../images/Makima.jpg'

const divider = <div className='border-t-[1px] border-[#F0F0F0] w-full mt-6' />

const ProfileContainer = () => {
  const [detail, setDetail] = useState({});

  // handle user's changes in input
  const handleChange = e => {
    setDetail({
      ...detail,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = e => {
    e.preventDefault();
  }

  return (
    <form className='mb-10'>
      {/* Header of profile (Including avatar, title, description and Save button) */}
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

        <button className='save-button'
          onClick={handleSubmit}>Save</button>
      </div>

      {/* Name */}
      <div className='flex mt-16 justify-between text-sm items-center'>
        <p className='min-w-[144px] font-semibold'>Your name</p>

        <input
          type='text'
          className='profile-input'
          name='name'
          value={detail.name}
          onChange={handleChange} />
      </div>

      {divider}

      {/* Email */}
      <div className='flex mt-6 justify-between text-sm items-center text-[#515151]'>
        <p className='min-w-[144px] font-semibold'>Your email</p>

        <input
          type='text'
          className='profile-input'
          name='email'
          value={detail.email} />
      </div>

      {divider}

      {/* Photo */}
      <div className='flex mt-6 justify-between text-sm items-center'>
        <p className='min-w-[144px] font-semibold'>Your photo</p>

        <div className='flex justify-between items-center w-full ml-36'>
          {/* User's current avatar */}
          <div>
            <img src={MakimaAva} alt="User's ava"
              className='w-20 h-20 rounded-full inline' />
            <span className='ml-3'>This will be displayed on your profile.</span>
          </div>

          {/* Button delete and button update */}
          <div>
            <button className='font-semibold hover:underline' type='button'>Delete</button>
            <button className='ml-4 font-semibold hover:underline' type='button'>Update</button>
          </div>
        </div>
      </div>

      {divider}

      {/* Your phone */}
      <div className='flex mt-6 justify-between text-sm items-center'>
        <p className='min-w-[144px] font-semibold'>Your phone</p>

        <input
          type='text'
          className='profile-input'
          name='phone'
          value={detail.phone}
          onChange={handleChange} />
      </div>

      {divider}

      {/* Your address */}
      <div className='flex mt-6 justify-between text-sm items-center'>
        <p className='min-w-[144px] font-semibold'>Your address</p>

        <input
          type='text'
          className='profile-input'
          name='address'
          value={detail.address}
          onChange={handleChange} />
      </div>

      {divider}

      {/* Province */}
      <div className='flex mt-6 justify-between text-sm items-center'>
        <p className='font-semibold min-w-[144px]'>Province</p>
        <div className='ml-36 w-full grid grid-cols-3 gap-8'>
          {/* Province */}
          <select
            className='province-input'
            name='province'
            placeholder='Province'
            value={detail.province}
            select={null}
            onChange={handleChange}>

            <option value='TP Ho Chi Minh' >TP Ho Chi Minh</option>

          </select>

          {/* District */}
          <select
            className='province-input'
            name='district'
            placeholder='District'
            value={detail.district}
            onChange={handleChange}>

            <option value='Quan Thu Duc' >Quan Thu Duc</option>

          </select>


          {/* Ward */}
          <select
            className='province-input'
            name='ward'
            placeholder='Ward'
            value={detail.ward}
            onChange={handleChange}>

            <option value='Phuong Linh Trung' >Phuong Linh Trung</option>
            <option value='Phuong Linh Trung' >Phuong Linh Trung</option>
          </select>
        </div>
      </div>

      {divider}

      {/* Your gender */}
      <div className='flex mt-6 justify-between text-sm items-center'>
        <p className='min-w-[144px] font-semibold'>Gender</p>

        <div className='ml-36 w-full flex items-center font-semibold'>
          <input id='Male' type='radio' name='gender' value='Male' />
          <label htmlFor='Male' className='ml-2'>Male</label>
          <input id='Female' type='radio' name='gender' value='Female' className='ml-10' />
          <label htmlFor='Female' className='ml-2'>Female</label>
          <input id='Other' type='radio' name='gender' value='Other' className='ml-10' />
          <label htmlFor='Other' className='ml-2'>Other</label>
        </div>
      </div>

      {divider}

      {/* Your date of birth */}
      <div className='flex mt-6 justify-between text-sm items-center'>
        <p className='min-w-[144px] font-semibold'>Your date of birth</p>

        <input
          type='text'
          className='profile-input'
          name='dob'
          value={detail.dob}
          onChange={handleChange} />
      </div>

    </form>
  )
}

export default ProfileContainer