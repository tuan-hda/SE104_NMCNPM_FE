import React, { useState } from 'react'
import CrossIcon from '../images/CrossIcon.svg'

const ForgotPasswordValidateCode = ({ setPage, returnLogin }) => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  const handleClick = (e) => {
    e.preventDefault();
    if (!code) {
      setError('Code required.')
      return
    }

    // validate code

    setError('')
    setPage(2)
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

        <p className='font-normal mt-4'>We will send a confirmation code to you email. <span className='text-primary font-bold cursor-pointer'>Send code.</span></p>

        {/* Code */}
        <input
          type='text'
          className={`${error ? 'auth-input-err' : 'auth-input'} font-semibold mt-8`}
          placeholder='Code'
          value={code}
          name='code'
          onChange={e => setCode(e.target.value)} />
        <div className='text-red-500 mt-1 ml-3 font-normal'>{error}</div>
      </div>

      {/* Button sign in */}
      <button
        type='submit'
        onClick={handleClick}
        className='auth-input bg-primary text-white font-bold hover:bg-opacity-90
            transition duration-300 '>
        VALIDATE
      </button>
    </form>
  )
}

export default ForgotPasswordValidateCode