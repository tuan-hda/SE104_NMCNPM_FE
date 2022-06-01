import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import LoadingScreen from './LoadingScreen'

const PrivateRoute = ({ children }) => {
  const { currentUser, loading } = useSelector(state => state.user)

  if (loading)
    return <LoadingScreen loading={true} bgopacity={true} />

  return currentUser ? children : <Navigate to='/signin' />
}

export default PrivateRoute