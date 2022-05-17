import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import CrossIcon from '../images/CrossIcon.svg'
import { validateInfo } from '../utils/validateInfo';

const ForgotPasswordResetPassword = ({ returnLogin }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState({
    password: '',
    confirmPassword: ''
  });

  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();

    const result = validateInfo({
      password: password,
      confirmPassword: confirmPassword
    })

    setError(result)

    if (result.password.length !== 0 || result.confirmPassword) {
      return
    }

    // validate code

    setError({
      password: '',
      confirmPassword: ''
    })

    console.log(1);

    navigate('/signin')
  }

  return (
    <form className='mx-4 sm:mx-20 md:mx-40 lg:mx-64 xl:mx-[420px] w-full h-5/6 py-20 bg-white rounded-xl flex flex-col justify-between  px-4 sm:px-10 md:px-20 lg:px-24 relative'>
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
          <h1 className='text-32 font-extrabold text-left'>Validate code</h1>
        </div>

        {/* Password */}
        <input
          type='password'
          className={`${Array.isArray(error.password) && error.password.length !== 0 ? 'auth-input-err' : 'auth-input'} font-semibold mt-8`}
          placeholder='Password'
          value={password}
          name='password'
          onChange={e => setPassword(e.target.value)} />

        {Array.isArray(error.password) && error.password.map((err, i) => <div className='text-red-500 mt-1 ml-3 font-normal' key={i}>{err}</div>
        )}


        {/* Confirm password */}
        <input
          type='password'
          className={`${error.confirmPassword ? 'auth-input-err' : 'auth-input'} font-semibold mt-4`}
          placeholder='Confirm password'
          value={confirmPassword}
          name='confirmPassword'
          onChange={e => setConfirmPassword(e.target.value)} />
        <div className='text-red-500 mt-1 ml-3 font-normal'>{error.confirmPassword}</div>
      </div>

      {/* Button sign in */}
      <button
        type='submit'
        onClick={handleClick}
        className='auth-input bg-primary text-white font-bold hover:bg-opacity-90
            transition duration-300 '>
        RESET
      </button>
    </form>
  )
}

export default ForgotPasswordResetPassword