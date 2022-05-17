import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import GoogleIcon from '../images/GoogleIcon.svg'
import FacebookIcon from '../images/FacebookIcon.png'
import CrossIcon from '../images/CrossIcon.svg'
import { validateInfo } from '../utils/validateInfo'

const showError = (text, isPassword = false) => {
  if (isPassword && text && Array.isArray(text)) {
    return text.map((t, i) => <span
      key={i}
      className='ml-4 text-red-500 font-normal text-xs'>
      {t}
      <br />
    </span>)
  }

  if (text) return <span className='ml-4 text-red-500 font-normal text-xs'>
    {text}
  </span>
}

const SignUp = () => {
  const [detail, setDetail] = useState({
    email: '',
    name: '',
    password: '',
    confirmPassword: '',
  })

  // Validate information
  const [error, setError] = useState({
    password: []
  });

  const handleSubmit = (e) => {
    setError(validateInfo(detail));
    e.preventDefault();
  }

  // Change detail state when user typ
  const changeDetail = (e) => {
    setDetail({ ...detail, [e.target.name]: e.target.value })
  }

  return (
    <div className='py-8 -mt-28 bg-gray-auth text-13 font-semibold min-h-screen flex justify-center items-center'>

      <div className='h-full mx-4 sm:mx-20 md:mx-40 lg:mx-64 xl:mx-[420px] py-8 bg-white rounded-xl flex flex-col justify-center
        px-4 sm:px-10 md:px-20 lg:px-24 relative'>
        {/* Close button */}
        <div className='absolute rounded-full cursor-pointer right-7 top-7
          transition duration-300 hover:bg-gray-200 w-8 h-8 flex justify-center items-center'>
          <img
            className='w-4 h-4'
            alt='Close'
            src={CrossIcon}></img>
        </div>

        {/* Greetings go here */}
        <div>
          <h1 className='text-32 font-extrabold text-center'>HELLO THERE!</h1>
          <p className='text-13 text-center font-normal mt-1'>Let's create an account for you.</p>
        </div>

        {/* Login form here */}
        <form className='mt-12 space-y-4 text-13'>
          {/* Email */}
          <input
            type='text'
            className={`${error.email ? 'auth-input-err' : 'auth-input'} font-semibold`}
            placeholder='Email'
            value={detail.email}
            name='email'
            onChange={changeDetail} />
          {showError(error.email)}

          {/* Name */}
          <input
            type='text'
            className={`${error.name ? 'auth-input-err' : 'auth-input'} font-semibold`}
            placeholder='Name'
            value={detail.name}
            name='name'
            onChange={changeDetail} />
          {showError(error.name)}

          {/* Password */}
          <input
            type='password'
            className={`${error.password.length !== 0 ? 'auth-input-err' : 'auth-input'} font-semibold`}
            value={detail.password}
            name='password'
            onChange={changeDetail}
            placeholder='Password' />
          {showError(error.password, true)}

          {/* Confirm password */}
          <input
            type='password'
            className={`${error.confirmPassword ? 'auth-input-err' : 'auth-input'} font-semibold`}
            value={detail.confirmPassword}
            name='confirmPassword'
            onChange={changeDetail}
            placeholder='Confirm Password' />
          {showError(error.confirmPassword)}

          {/* Button sign up */}
          <button
            type='submit'
            onClick={handleSubmit}
            className='auth-input bg-primary text-white font-bold hover:bg-opacity-90
            transition duration-300 '>
            Sign up
          </button>
        </form>

        {/* Divider */}
        <div className='flex items-center mt-6 justify-between'>
          <span className='border-t-[0.5px] border-gray-border w-[45%]' />
          <span>or</span>
          <span className='border-t-[0.5px] border-gray-border w-[45%]' />
        </div>

        {/* Sign up with Google | Sign up with Facebook */}
        <div>
          <button className='flex mt-6 gap-2 justify-center items-center auth-input font-bold transition duration-300 hover:bg-gray-100'>
            <img
              src={GoogleIcon}
              alt='Google Icon'
              className='w-5 h-5' />
            Sign up with Google
          </button>

          <button className='text-center mt-2 auth-input font-bold bg-blue-facebook transition duration-300
           hover:bg-opacity-90 text-white flex gap-2 justify-center items-center'>
            <img
              src={FacebookIcon}
              alt='Facebook Icon'
              className='w-5 h-5' />
            Sign up with Facebook
          </button>
        </div>

        {/* Sign In */}
        <div className='flex justify-center mt-6 whitespace-pre'>
          Already have an account? <Link to='/signin' className='underline'>Sign in</Link>
        </div>
      </div>
    </div>
  )
}

export default SignUp