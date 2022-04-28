import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import GoogleIcon from '../images/GoogleIcon.svg'
import FacebookIcon from '../images/FacebookIcon.png'
import CrossIcon from '../images/CrossIcon.svg'

const SignUp = () => {
  const [detail, setDetail] = useState({
    email: '',
    name: '',
    password: ''
  })

  // Change detail state when user typ
  const changeDetail = (e) => {
    setDetail({ ...detail, [e.target.name]: e.target.value })
  }

  return (
    <div className='px-[450px] py-8 bg-gray-auth h-screen text-13 font-semibold'>

      <div className='w-full h-full bg-white rounded-xl flex flex-col justify-center
        px-24 relative'>
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
            className='auth-input font-semibold'
            placeholder='Email'
            value={detail.email}
            name='email'
            onChange={changeDetail} />

          {/* Name */}
          <input
            type='text'
            className='auth-input font-semibold'
            placeholder='Name'
            value={detail.name}
            name='name'
            onChange={changeDetail} />

          {/* Password */}
          <input
            type='password'
            className='auth-input font-semibold'
            value={detail.password}
            name='password'
            onChange={changeDetail}
            placeholder='Password' />

          {/* Confirm password */}
          <input
            type='password'
            className='auth-input font-semibold'
            placeholder='Confirm Password' />

          {/* Button sign up */}
          <button
            type='submit'
            onClick={e => e.preventDefault()}
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
    </div >
  )
}

export default SignUp