import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import GoogleIcon from '../images/GoogleIcon.svg'
import FacebookIcon from '../images/FacebookIcon.png'
import CrossIcon from '../images/CrossIcon.svg'
import { useDispatch, useSelector } from 'react-redux'
import {
  facebookSigninInitiate,
  googleSigninInitiate,
  resetError,
  signinInitiate
} from '../actions'
import LoadingScreen from '../components/LoadingScreen'
import appApi from '../api/appApi'
import * as routes from '../api/apiRoutes'

// Show alert if error
const showError = text => {
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
  const changeDetail = e => {
    setDetail({ ...detail, [e.target.name]: e.target.value })
  }

  // Sign in with email and password
  const handleNormalSignin = e => {
    e.preventDefault()

    // Validate info (not empty field is enough)

    let isValid = true

    if (!detail.email) {
      isValid = false
      setError({
        ...err,
        email: 'Email required.'
      })
    }

    if (!detail.password) {
      isValid = false
      setError({
        ...err,
        password: 'Password required.'
      })
    }

    if (!isValid) return

    dispatch(signinInitiate(detail.email, detail.password))
  }

  // Sign in with Google
  const handleGoogle = () => {
    dispatch(googleSigninInitiate())
  }

  // Sign in with Facebook
  const handleFacebook = () => {
    dispatch(facebookSigninInitiate())
  }

  const createNewAccount = async () => {
    try {
      const token = await currentUser.getIdToken()

      await appApi.post(
        routes.SIGN_UP,
        routes.getSignupBody(currentUser.email, currentUser.name),
        routes.getAccessTokenHeader(token)
      )
    } catch (err) {
      if (err.response) {
        console.log(err.response.data)
        console.log(err.response.status)
        console.log(err.response.headers)
      } else {
        console.log(err.message)
      }
    }
  }

  // Navigate to homepage if signed in successfully
  useEffect(() => {
    // Clear input
    setDetail({
      email: '',
      password: ''
    })

    if (currentUser) {
      navigate('/')
      createNewAccount()
    }
  }, [currentUser, navigate])

  useEffect(() => {
    if (!error) {
      setError({
        email: '',
        password: ''
      })
    } else if (
      error.includes('auth/user-not-found') ||
      error.includes('auth/invalid-email')
    ) {
      setError(previousState => ({
        ...previousState,
        password: 'Wrong email or password.',
        email: ' '
      }))
    } else if (error.includes('auth/wrong-password')) {
      setError(previousState => ({
        ...previousState,
        password: 'Wrong email or password.',
        email: ' '
      }))
    } else if (error.includes('auth/too-many-requests')) {
      setError(previousState => ({
        ...previousState,
        password: 'Too many requests. Try again later.',
        email: ' '
      }))
    } else {
      setError(previousState => ({
        ...previousState,
        password: 'Sign in failed.',
        email: ' '
      }))
    }
  }, [error])

  useEffect(() => {
    setError({
      email: '',
      password: ''
    })
    dispatch(resetError())
  }, [dispatch])

  if (loading) return <LoadingScreen loading={true} />

  return (
    <div className='-mt-28 py-4 min-h-screen bg-gray-auth text-13 font-semibold flex items-center justify-center'>
      <div className='w-[90%] md:w-4/6 lg:w-3/5 xl:w-2/5 h-full py-20 bg-white rounded-xl flex flex-col justify-center px-4 sm:px-10 md:px-20 lg:px-24 relative'>
        {/* Close button */}
        <div
          className='absolute rounded-full cursor-pointer right-7 top-7
          transition duration-300 hover:bg-gray-200 w-8 h-8 flex justify-center items-center'
        >
          <img className='w-4 h-4' alt='Close' src={CrossIcon}></img>
        </div>

        {/* Greetings go here */}
        <div>
          <h1 className='text-32 font-extrabold text-center'>WELCOME BACK!</h1>
          <p className='text-13 text-center font-normal mt-1'>
            We are so happy to see you again.
          </p>
        </div>

        {/* Login form here */}
        <form className='mt-12 space-y-4 text-13'>
          {/* Email */}
          <input
            type='text'
            className={`${
              err.email ? 'auth-input-err' : 'auth-input'
            } font-semibold`}
            placeholder='Email'
            value={detail.email}
            name='email'
            onChange={changeDetail}
          />
          {showError(err.email)}

          {/* Password */}
          <input
            type='password'
            className={`${
              err.password ? 'auth-input-err' : 'auth-input'
            } font-semibold`}
            value={detail.password}
            name='password'
            onChange={changeDetail}
            placeholder='Password'
          />
          {showError(err.password)}

          {/* Button sign in */}
          <button
            type='submit'
            onClick={handleNormalSignin}
            className='auth-input bg-primary text-white font-bold hover:bg-opacity-90
            transition duration-300 '
          >
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
          <button
            className='flex mt-6 gap-2 justify-center items-center auth-input font-bold transition duration-300 hover:bg-gray-100'
            onClick={() => handleGoogle()}
          >
            <img src={GoogleIcon} alt='Google Icon' className='w-5 h-5' />
            Sign in with Google
          </button>

          <button
            className='text-center mt-2 auth-input font-bold bg-blue-facebook transition duration-300 hover:bg-opacity-90 text-white flex gap-2 justify-center items-center'
            onClick={() => handleFacebook()}
          >
            <img src={FacebookIcon} alt='Facebook Icon' className='w-5 h-5' />
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
