import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import GoogleIcon from '../images/GoogleIcon.svg'
import FacebookIcon from '../images/FacebookIcon.png'
import CrossIcon from '../images/CrossIcon.svg'
import { useDispatch, useSelector } from 'react-redux'
import { signinInitiate, signupInitiate } from '../actions'

// Show alert if error
const showError = (text) => {
  return <span className='ml-4 text-red-500 font-normal text-xs'>{text}</span>
}

const SignIn = () => {
  const [detail, setDetail] = useState({
    email: '',
    password: ''
  })

  const [err, setError] = useState({
    email: '',
    password: ''
  })

  const { loading, currentUser, error } = useSelector(state => state.user)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  // Change detail state when user typ
  const changeDetail = (e) => {
    setDetail({ ...detail, [e.target.name]: e.target.value })
  }

  // Sign in with email and password
  const handleNormalSignin = (e) => {
    e.preventDefault()

    const err = {
      email: '',
      password: ''
    }

    // Validate info (not empty field is enough)

    if (!detail.email)
      err.email = 'Email required'

    if (!detail.password)
      err.password = 'Password required'

    setError(err)

    if (err.email || err.password)
      return

    dispatch(signinInitiate(detail.email, detail.password))
  }

  // Navigate to homepage if signed in successfully
  useEffect(() => {
    // Clear input
    setDetail({
      email: '',
      password: ''
    })

    if (currentUser)
      navigate('/')
  }, [currentUser, navigate])

  return ((loading || currentUser) ?
    <div></div>
    :
    <div className='-mt-28 py-4 min-h-screen bg-gray-auth text-13 font-semibold flex items-center justify-center'>

      <div className='w-[90%] md:w-4/6 lg:w-3/5 xl:w-2/5 h-full py-20 bg-white rounded-xl flex flex-col justify-center px-4 sm:px-10 md:px-20 lg:px-24 relative'>
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
            className={`${err.email ? 'auth-input-err' : 'auth-input'} font-semibold`}
            placeholder='Email'
            value={detail.email}
            name='email'
            onChange={changeDetail} />
          {showError(err.email)}

          {/* Password */}
          <input
            type='password'
            className={`${err.password ? 'auth-input-err' : 'auth-input'} font-semibold`}
            value={detail.password}
            name='password'
            onChange={changeDetail}
            placeholder='Password' />
          {showError(err.password)}

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
            onClick={handleNormalSignin}
            className='auth-input bg-primary text-white font-bold hover:bg-opacity-90
            transition duration-300 '>
            SIGN IN
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

        {/* Create account | Forgot password */}
        <div className='flex underline justify-between mt-6'>
          <Link to='/signup'>Create account</Link>
          <Link to='/forgotpassword'>Forgot password</Link>
        </div>
      </div>
    </div>
  )
}

export default SignIn