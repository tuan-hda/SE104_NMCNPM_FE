import React,{useState} from 'react'
import {Link} from 'react-router-dom'
import Logo from './Logo'   
import cartIcon from '../images/Cart.png'
import {MenuIcon,XIcon} from '@heroicons/react/outline'

const Header = () => {
  const [nav,setNav] = useState(false)
  const handleClick = () => setNav(!nav)

  return (
    <div className='w-screen h-[80px] bg-[#F8F8F8] fixed z-20'>
        {/* Header */}
        <div className='px-32 justify-between flex items-center w-full h-full '>
          {/* Logo */}
          <Logo/>
          {/* Navbar */}
          <ul className='hidden mr-32 md:flex'>
            <li className='px-16 font-bold'>
              <Link to="/">Home</Link>
            </li>
            <li className='px-16 font-bold'>
              <Link to="/menu">Menu</Link>
            </li>
            <li className='px-16 font-bold'>
              <Link to="/">About</Link>
            </li>
            <li className='px-16 font-bold'>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
          {/* Start Order Button */}
          <button className='hidden md:flex items-center bg-secondary text-15 text-white font-bold rounded-[50px] w-50 h-12 px-10'>
            Start Order
          </button>
          {/* Sign in Button */}
          <button className='font-semibold'>
            Sign in
          </button>
          {/* Divider */}
          |
          {/* Cart Button */}
          <button className='bg-fixed'>
            <img src={cartIcon} alt="cart" className='fill-current h-12'/>
          </button>
          {/* Menu Button */}
          <div className='md:hidden' onClick={handleClick}>
            {!nav ? <MenuIcon className='w-5'/>:<XIcon className='w-5'/>}
          </div>
        </div>
        {
        //   <ul className={!nav ? 'hidden' : 'absolute bg-[#F8F8F8] w-full px-32 justify-between'}>
        //   <li className='p-4 border-b-2 border-zinc-300 w-full font-bold'>
        //     <Link to="/">Home</Link>
        //   </li>
        //   <li className='p-4 border-b-2 border-zinc-300 w-full font-bold'>
        //     <Link to="/menu">Menu</Link>
        //   </li>
        //   <li className='p-4 border-b-2 border-zinc-300 w-full font-bold'>
        //     <Link to="/">About</Link>
        //   </li>
        //   <li className='p-4 border-b-2 border-zinc-300 w-full font-bold'>
        //     <Link to="/contact">Contact</Link>
        //   </li>
        // </ul>
        }
        
    </div>
  )
}

export default Header