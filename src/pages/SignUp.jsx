import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import CrossIcon from '../images/CrossIcon.svg'
import GoogleIcon from '../images/GoogleIcon.svg'
import FacebookIcon from '../images/FacebookIcon.png'
import { validateInfo } from '../utils/validateInfo'
import { useDispatch, useSelector } from 'react-redux'
import { facebookSigninInitiate, googleSigninInitiate, signupInitiate } from '../actions'
import LoadingScreen from '../components/LoadingScreen'
import api from '../api/appApi'
import * as routes from '../api/apiRoutes'

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
  const [infoError, setError] = useState({
    password: []
  });

  const navigate = useNavigate()

  const { currentUser, loading, error } = useSelector(state => state.user)

  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault();

    const err = validateInfo(detail)
    setError(err);

    if (!err.email && !err.name && err.password.length === 0 && !err.confirmPassword) {
      dispatch(signupInitiate(detail.email, detail.password, detail.name))
      setDetail((previousState) => ({
        ...previousState,
        password: '',
        confirmPassword: ''
      }))
    }
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

      // await api.post(
      //   routes.SIGN_UP,
      //   routes.getSignupBody(currentUser.email, currentUser.name),
      //   routes.getSignupHeader(token)
      // )
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

  // Navigate to homepage if signed up successfully
  useEffect(() => {
    if (error) {
      if (error.includes('auth/email-already-in-use')) {
        setError((previousState) => ({
          ...previousState,
          email: 'Email already exists.'
        }))
      }
      return
    }

    if (currentUser) {
      console.log(currentUser.email)
      console.log(currentUser.displayName)
      createNewAccount()
      setDetail({
        email: '',
        name: '',
        password: '',
        confirmPassword: ''
      })
      navigate('/')
    }
  }, [currentUser, navigate, error])

  // Change detail state when user typ
  const changeDetail = (e) => {
    const key = e.target.name
    const value = e.target.value

    setDetail({ ...detail, [key]: value })

    let err
    if (key === 'confirmPassword') {
      err = validateInfo({
        password: detail.password,
        [key]: value
      })
    } else {
      err = validateInfo({
        [key]: value
      })
    }

    setError((previousState) => ({
      ...previousState,
      [key]: err[key]
    }))
  }

  if (loading)
    return <LoadingScreen loading={true} />

  return (
    <div className='py-8 -mt-28 bg-gray-auth text-13 font-semibold min-h-screen flex justify-center items-center'>
      <div className='h-full w-[90%] md:w-4/6 lg:w-3/5 xl:w-2/5  py-8 bg-white rounded-xl flex flex-col justify-center
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
            className={`${infoError.email ? 'auth-input-err' : 'auth-input'} font-semibold`}
            placeholder='Email'
            value={detail.email}
            name='email'
            onChange={changeDetail} />
          {showError(infoError.email)}

          {/* Name */}
          <input
            type='text'
            className={`${infoError.name ? 'auth-input-err' : 'auth-input'} font-semibold`}
            placeholder='Name'
            value={detail.name}
            name='name'
            onChange={changeDetail} />
          {showError(infoError.name)}

          {/* Password */}
          <input
            type='password'
            className={`${infoError.password.length !== 0 ? 'auth-input-err' : 'auth-input'} font-semibold`}
            value={detail.password}
            name='password'
            onChange={changeDetail}
            placeholder='Password' />
          {showError(infoError.password, true)}

          {/* Confirm password */}
          <input
            type='password'
            className={`${infoError.confirmPassword ? 'auth-input-err' : 'auth-input'} font-semibold`}
            value={detail.confirmPassword}
            name='confirmPassword'
            onChange={changeDetail}
            placeholder='Confirm Password' />
          {showError(infoError.confirmPassword)}

          {/* Button sign up */}
          <button
            type='submit'
            onClick={handleSubmit}
            className='auth-input bg-primary text-white font-bold hover:bg-opacity-90
            transition duration-300 '>
            SIGN UP
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
          <button className='flex mt-6 gap-2 justify-center items-center auth-input font-bold transition duration-300 hover:bg-gray-100'
            onClick={() => handleGoogle()}>
            <img
              src={GoogleIcon}
              alt='Google Icon'
              className='w-5 h-5' />
            Sign up with Google
          </button>

          <button className='text-center mt-2 auth-input font-bold bg-blue-facebook transition duration-300 hover:bg-opacity-90 text-white flex gap-2 justify-center items-center'
            onClick={() => handleFacebook()}>
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

