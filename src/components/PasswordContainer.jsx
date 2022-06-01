import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { validateInfo } from '../utils/validateInfo';
import firebase from 'firebase/compat/app';
import { changePasswordInitiate } from '../actions';
import LoadingScreen from './LoadingScreen'

const divider = <div className='border-t-[1px] border-[#F0F0F0] w-full mt-6' />

const PasswordContainer = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [err, setError] = useState({
    oldPassword: '',
    password: '',
    confirmPassword: ''
  });
  const [reauthenErr, setReauthenErr] = useState('')

  const { loading, currentUser, error, message } = useSelector(state => state.user)
  const dispatch = useDispatch()

  // Handle onChange for old password
  const onOldPasswordChange = (e) => {
    const key = e.target.name
    const value = e.target.value

    const validateErr = validateInfo({
      [key]: value
    })

    setError((previousState) => ({
      ...previousState,
      [key]: validateErr[key]
    }))

    setOldPassword(e.target.value)
  }

  // Handle onChange for new password
  const onNewPasswordChange = e => {
    const key = e.target.name
    const value = e.target.value

    const validateErr = validateInfo({
      password: value
    })

    setError((previousState) => ({
      ...previousState,
      [key]: validateErr[key]
    }))

    setNewPassword(e.target.value);
  }

  // Handle onChange for confirm password
  const onConfirmPasswordChange = e => {
    const key = e.target.name
    const value = e.target.value

    const validateErr = validateInfo({
      [key]: value,
      password: newPassword
    })

    setError((previousState) => ({
      ...previousState,
      [key]: validateErr[key]
    }))

    setConfirmPassword(e.target.value);
  }

  // Handle submit when user hit save button
  const handleSubmit = () => {
    // Show error if new password does not match confirm password
    const err = validateInfo({
      oldPassword: oldPassword,
      password: newPassword,
      confirmPassword: confirmPassword
    })
    setError(err)

    // Cant continue if occur errors
    if (err.oldPassword || err.password.length !== 0 || err.confirmPassword)
      return

    changePassword()
  }

  const changePassword = async () => {
    const credentials = firebase.auth.EmailAuthProvider.credential(
      currentUser.email,
      oldPassword
    )

    try {
      await currentUser.reauthenticateWithCredential(credentials)
      setReauthenErr('')
      dispatch(changePasswordInitiate(currentUser, newPassword))
    } catch (error) {
      if (error.message.includes('auth/wrong-password')) {
        setReauthenErr('Wrong password.')
      } else if (error.message.includes('auth/too-many-requests')) {
        setReauthenErr('Too many requests. Try again later.')
      } else {
        setReauthenErr('Reauthentication failed.')
      }
      console.log(error.message)
    }
  }

  return (
    <form className='mb-10' onSubmit={e => e.preventDefault()}>
      <LoadingScreen loading={loading} />

      {/* Header (including Title, description and save button) */}
      <div className='flex items-center relative justify-between'>
        {/* Including Title, description */}
        <div>
          <h1 className='font-bold text-32'>Password</h1>
          <p className='text-sm mt-2'>Please never share or give out your password.</p>
        </div>

        <button className='save-button' onClick={handleSubmit}>Save</button>
      </div>

      {/* Success message */}
      {message && <div className='text-black font-normal bg-[#47AC40] border-[1px] border-[#47AC40] py-5 px-4 rounded-md bg-opacity-50 mt-4 text-13'>{message}</div>}

      {/* Error message */}
      {(reauthenErr || error) && <div className='text-black font-normal bg-red-500 border-[1px] border-red-500 py-5 px-4 rounded-md bg-opacity-40 mt-4 text-13'>
        <p>{reauthenErr}</p>
        {error && <p>Change password failed.</p>}
      </div>}

      {/* Old password */}
      <div className='flex mt-12 justify-between text-sm items-center'>
        <p className='w-36 font-semibold'>Old password</p>

        <input
          type='password'
          className={err.oldPassword ? 'profile-input-err' : 'profile-input'}
          name='oldPassword'
          value={oldPassword}
          onChange={onOldPasswordChange} />
      </div>
      {/* Show error if user does not enter old password field */}
      {err.oldPassword && <p className='text-red-500 text-sm ml-40'>{err.oldPassword}</p>}

      {divider}

      {/* New password */}
      <div className='flex mt-6 justify-between text-sm items-center'>
        <p className='w-36 font-semibold'>New password</p>

        <input
          type='password'
          className={err.password.length ? 'profile-input-err' : 'profile-input'}
          name='password'
          value={newPassword}
          onChange={onNewPasswordChange} />
      </div>
      {/* Show errors if new password does not meet requirements */}
      {err.password && err.password.map((err, i) => <p
        className='text-red-500 text-sm ml-40'
        key={i}>
        {err}</p>)}

      {divider}

      {/* Confirm password */}
      <div className='flex mt-6 justify-between text-sm items-center'>
        <p className='w-36 font-semibold'>Confirm password</p>

        <input
          type='password'
          className={err.confirmPassword ? 'profile-input-err' : 'profile-input'}
          name='confirmPassword'
          value={confirmPassword}
          onChange={onConfirmPasswordChange} />

      </div>
      {/* Show error if user type a password does not match with new password */}
      {err.confirmPassword && <p className='text-red-500 text-sm ml-40'>{err.confirmPassword}</p>}
    </form>
  )
}

export default PasswordContainer