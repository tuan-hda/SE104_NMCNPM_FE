import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import LoadingScreen from './LoadingScreen'

const PrivateRoute = ({ children }) => {
  const [delay, setDelay] = useState(true)
  const { currentUser } = useSelector(state => state.user)

  setTimeout(() => {
    setDelay(false)
  }, [1000])

  if (delay)
    return <LoadingScreen loading={true} bgopacity={true} />

  return currentUser ? children : <Navigate to='/signin' />
}

export default PrivateRoute