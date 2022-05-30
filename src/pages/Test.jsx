import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logoutInitiate } from '../actions'

// This is a test component
// You can write any function or feature here to test it
// On deployment, delete

const Test = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleClick = () => {
    dispatch(logoutInitiate())
    navigate('/')
  }

  return (
    <button onClick={() => handleClick()}>Sign out</button>
  )
}

export default Test