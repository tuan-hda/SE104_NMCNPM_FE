import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Search from '../components/Search'
import Logo from './Logo'
import cartIcon from '../images/Cart.png'

const Header = ({ cartItems }) => {
  // const [nav,setNav] = useState(false)
  // const handleClick = () => setNav(!nav)

  const [cartCount, setCartCount] = useState(0);


  useEffect(() => {
    let count = 0;
    for (let i = 0; i < cartItems.length; i++) {
      count += cartItems[i].qty;
    }
    console.log(cartItems)
    setCartCount(count);
  }, [cartItems, cartCount])



  return (
    <div className='w-screen h-[80px] bg-[#F8F8F8] fixed top-0 z-20'>
      {/* Header */}
      <div className='px-32 justify-between flex items-center w-full h-full '>
        {/* Logo */}
        <Logo />
        {/* Navbar */}
        <ul className='hidden mr-14 md:flex'>
          <li className='px-12 font-bold'>
            <Link to="/">Home</Link>
          </li>
          <li className='px-12 font-bold'>
            <Link to="/menu">Menu</Link>
          </li>
          <li className='px-12 font-bold'>
            <Link to="/about">About</Link>
          </li>
          <li className='px-12 font-bold'>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
        {/* Search */}
        <Search />
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
        <div className='relative h-[50px] w-[50px]'>
          <Link to={'/cart'}>
            {/* Cart Icon */}
            <button className='bg-fixed static'>
              <img src={cartIcon} alt="cart" className='fill-current h-12 w-12' />
            </button>
            {/* Cart Count */}
            <div className='absolute top-0 right-0'>
              <div className='rounded-full w-4 h-4 bg-primary relative'>
                <h6 className='text-white text-[10px] font-semibold absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                  {cartCount}
                </h6>
              </div>
            </div>

          </Link>

        </div>
        {
          //   {/* Menu Button */}
          //   <div className='md:hidden' onClick={handleClick}>
          //     {!nav ? <MenuIcon className='w-5'/>:<XIcon className='w-5'/>}
          //   </div>
        }
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

const mapStateToProps = state => {
  return {
    cartItems: state.cart.cartItems
  }
}

export default connect(mapStateToProps)(Header)