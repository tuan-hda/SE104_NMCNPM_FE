import React, { useState } from 'react'
import { validateInfo } from '../utils/validateInfo';

const divider = <div className='border-t-[1px] border-[#F0F0F0] w-full mt-6' />

const PasswordContainer = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(true);

  // Handle onChange for old password
  const onOldPasswordChange = (e) => {
    setOldPassword(e.target.value)
  }

  // Handle onChange for new password
  const onNewPasswordChange = e => {
    setNewPassword(e.target.value);
  }

  // Handle onChange for confirm password
  const onConfirmPasswordChange = e => {
    setConfirmPassword(e.target.value);
  }

  // Handle submit when user hit save button
  const handleSubmit = () => {
    // Show error if new password does not match confirm password
    setError(validateInfo({
      oldPassword: oldPassword,
      password: newPassword,
      confirmPassword: confirmPassword
    }))

    // Send a HTTP POST request here
  }

  return (
    <form className='mb-10' onSubmit={e => e.preventDefault()}>
      {/* Header (including Title, description and save button) */}
      <div className='flex items-center relative'>
        {/* Including Title, description */}
        <div>
          <h1 className='font-bold text-32'>Password</h1>
          <p className='text-sm mt-2'>Please never share or give out your password.</p>
        </div>

        <button className='save-button' onClick={handleSubmit}>Save</button>
      </div>

      {/* Old password */}
      <div className='flex mt-12 justify-between text-sm items-center'>
        <p className='min-w-[144px] font-semibold'>Old password</p>

        <input
          type='password'
          className='profile-input'
          name='oldPassword'
          value={oldPassword}
          onChange={onOldPasswordChange} />
      </div>
      {/* Show error if user does not enter old password field */}
      {error.oldPassword && <p className='text-red-500 text-sm ml-72'>{error.oldPassword}</p>}

      {divider}

      {/* New password */}
      <div className='flex mt-6 justify-between text-sm items-center'>
        <p className='min-w-[144px] font-semibold'>New password</p>

        <input
          type='password'
          className='profile-input'
          name='newPassword'
          value={newPassword}
          onChange={onNewPasswordChange} />
      </div>
      {/* Show errors if new password does not meet requirements */}
      {error.password && error.password.map((err, i) => <p
        className='text-red-500 text-sm ml-72'
        key={i}>
        {err}</p>)}

      {divider}

      {/* Confirm password */}
      <div className='flex mt-6 justify-between text-sm items-center'>
        <p className='min-w-[144px] font-semibold'>Confirm password</p>

        <input
          type='password'
          className='profile-input'
          name='confirmPassword'
          value={confirmPassword}
          onChange={onConfirmPasswordChange} />

      </div>
      {/* Show error if user type a password does not match with new password */}
      {error.confirmPassword && <p className='text-red-500 text-sm ml-72'>{error.confirmPassword}</p>}
    </form>
  )
}

export default PasswordContainer