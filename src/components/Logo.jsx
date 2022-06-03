import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../images/Logo.png'

const Logo = ({textColor='#E16246',width=40}) => {
  return (
    <Link to="/">
    <div className='grid place-items-center gap-1'>
        <img src={logo} alt="logo" width={width}/>
        <h1 className='text-center font-bold' style={{color:textColor}}>Hambursy</h1>
    </div>
    </Link>
  )
}

export default Logo