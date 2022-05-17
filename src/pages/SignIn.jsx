import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import GoogleIcon from '../images/GoogleIcon.svg'
import FacebookIcon from '../images/FacebookIcon.png'
import CrossIcon from '../images/CrossIcon.svg'

const SignIn = () => {
  const [detail, setDetail] = useState({
    email: '',
    password: ''
  })

  // Change detail state when user typ
  const changeDetail = (e) => {
    setDetail({ ...detail, [e.target.name]: e.target.value })
  }

  return (
    <div className='-mt-28 py-4 min-h-screen bg-gray-auth text-13 font-semibold flex items-center justify-center'>

      <div className='mx-4 sm:mx-20 md:mx-40 lg:mx-64 xl:mx-[420px] w-full h-full py-20 bg-white rounded-xl flex flex-col justify-center px-4 sm:px-10 md:px-20 lg:px-24 relative'>
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
          <h1 className='text-32 font-extrabold text-center'>WELCOME BACK!</h1>
          <p className='text-13 text-center font-normal mt-1'>We are so happy to see you again.</p>
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

          {/* Password */}
          <input
            type='password'
            className='auth-input font-semibold'
            value={detail.password}
            name='password'
            onChange={changeDetail}
            placeholder='Password' />

          {/* Stay signed in */}
          <div className='flex items-center gap-2'>
            <input
              type='checkbox'
              id='staySignedIn'
              className='w-4 h-4 accent-primary' />

            <label htmlFor='staySignedIn' className='font-semibold cursor-pointer'>
              Stay signed in
            </label>
          </div>

          {/* Button sign in */}
          <button
            type='submit'
            onClick={e => e.preventDefault()}
            className='auth-input bg-primary text-white font-bold hover:bg-opacity-90
            transition duration-300 '>
            Sign in
          </button>
        </form>

        {/* Divider */}
        <div className='flex items-center mt-6 justify-between'>
          <span className='border-t-[0.5px] border-gray-border w-[45%]' />
          <span>or</span>
          <span className='border-t-[0.5px] border-gray-border w-[45%]' />
        </div>

        {/* Sign in with Google | Sign in with Facebook */}
        <div>
          <button className='flex mt-6 gap-2 justify-center items-center auth-input font-bold transition duration-300 hover:bg-gray-100'>
            <img
              src={GoogleIcon}
              alt='Google Icon'
              className='w-5 h-5' />
            Sign in with Google
          </button>

          <button className='text-center mt-2 auth-input font-bold bg-blue-facebook transition duration-300
           hover:bg-opacity-90 text-white flex gap-2 justify-center items-center'>
            <img
              src={FacebookIcon}
              alt='Facebook Icon'
              className='w-5 h-5' />
            Sign in with Facebook
          </button>
        </div>

        {/* Create account | Forget password */}
        <div className='flex underline justify-between mt-6'>
          <Link to='/signup'>Create account</Link>
          <Link to='/forgetpassword'>Forget password</Link>
        </div>
      </div>
    </div >
  )
}

export default SignIn