import React from 'react'
import logo from '../images/Logo.png'

const Logo = ({textColor='#E16246',width=40}) => {
  return (
    <div className='grid place-items-center gap-1'>
        <img src={logo} alt="logo" width={width}/>
        <h1 className='text-center font-bold' style={{color:textColor}}>Hambursy</h1>
    </div>
  )
}

export default Logo