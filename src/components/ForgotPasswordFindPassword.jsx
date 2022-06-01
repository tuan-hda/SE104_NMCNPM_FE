import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { resetPasswordInitiate } from '../actions';
import CrossIcon from '../images/CrossIcon.svg'
import LoadingScreen from './LoadingScreen'

const ForgotPasswordFindPassword = ({ returnLogin }) => {
  const [email, setEmail] = useState('');
  const [err, setError] = useState('');

  const { loading, currentUser, error, message } = useSelector(state => state.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    setError('')
  }, [])

  // Prevent user from resetting password if already logged in
  useEffect(() => {
    if (currentUser) {
      navigate('/')
    }
  }, [currentUser, navigate])

  // Handle error when reset password
  useEffect(() => {
    if (!error) {
      setError('')
    } else if (error.includes('auth/user-not-found') || error.includes('auth/invalid-email')) {
      setError('Email does not exist.')
    } else {
      setError('Sent email failed.')
    }
  }, [error])

  const handleClick = (e) => {
    e.preventDefault();
    if (!email) {
      setError('Email required.')
      return
    }

    if (!String(email).match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
      setError('Email is invalid.')
      return
    }

    dispatch(resetPasswordInitiate(email))

  }

  return (
    <form className='mx-4 sm:mx-20 md:mx-40 lg:mx-64 xl:mx-[420px] w-full h-5/6 py-20 bg-white rounded-xl flex flex-col justify-between  px-4 sm:px-10 md:px-20 lg:px-24 relative'>
      <LoadingScreen loading={loading} />

      {/* Close button */}
      <div className='absolute rounded-full cursor-pointer right-7 top-7
          transition duration-300 hover:bg-gray-200 w-8 h-8 flex justify-center items-center'
        onClick={() => returnLogin()}>
        <img
          className='w-4 h-4'
          alt='Close'
          src={CrossIcon}></img>
      </div>

      {/* Greetings and email */}
      <div>
        {/* Greetings go here */}
        <div>
          <h1 className='text-32 font-extrabold text-left'>Reset your password</h1>
        </div>

        {/* Email */}
        <input
          type='text'
          className={`${err ? 'auth-input-err' : 'auth-input'} font-semibold mt-8`}
          placeholder='Email'
          value={email}
          name='email'
          onChange={e => setEmail(e.target.value)} />
        <div className='text-red-500 mt-1 ml-3 font-normal'>{err}</div>

        {!err && message && <div className='text-black font-normal bg-[#47AC40] border-[1px] border-[#47AC40] p-4 rounded-md bg-opacity-50 mt-4'>{message}</div>}
      </div>

      {/* Button sign in */}
      <button
        type='submit'
        onClick={handleClick}
        className='auth-input bg-primary text-white font-bold hover:bg-opacity-90
            transition duration-300 '>
        SEND RESET EMAIL
      </button>
    </form >
  )
}

export default ForgotPasswordFindPassword