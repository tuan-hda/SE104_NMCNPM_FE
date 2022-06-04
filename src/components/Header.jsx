import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect, useSelector } from 'react-redux'
import Search from '../components/Search'
import Logo from './Logo'
import cartIcon from '../images/Cart.png'
import profileIcon from '../images/profileIcon.png'
import api from '../api/appApi'
import * as routes from '../api/apiRoutes'
import { initCart } from '../actions/cart-actions'


const Header = ({cartItems,initCart}) => {
  // const [nav,setNav] = useState(false)
  // const handleClick = () => setNav(!nav)

  const [cartCount, setCartCount] = useState(0);
  const [isNavShowing, toggleNav] = useState(false);
  const { currentUser } = useSelector(state => state.user)

  let items
  const fetchCart = async () => {
    try {
      const token = await currentUser.getIdToken()

      let result = await api.get(routes.DISPLAY_CART_ITEM, routes.getAccessTokenHeader(token))

      console.log(result)

      items = result.data.cartItems
      console.log(items)

      if (cartItems.length===0) {
        initCart(items)
      }

      let count = 0;

      for (let i = 0; i < items.length; i++) {
            count += items[i].number;
      }

      setCartCount(count)
    }
    catch (err) {
      console.log(err)
    }
  }

  //get Cart
  useEffect(() => {
    if (currentUser) {
      fetchCart()
    }
  },[currentUser])

  useEffect(() => {
    fetchCart()
  },[cartItems])
  

  // useEffect(() => {
  //   let count = 0;
  //   for (let i = 0; i < cartItems.length; i++) {
  //     count += cartItems[i].qty;
  //   }
  //   console.log(cartItems)
  //   setCartCount(count);
  // }, [cartItems, cartCount])

  return (
    <div className='w-screen h-[80px] bg-[#F8F8F8] fixed top-0 z-20'>
      {/* Header */}
      <div className='px-32 justify-between flex items-center w-full h-full '>
        {/* Logo */}
        <Logo />
        {/* Navbar */}
        <ul className='hidden mr-10 md:flex'>
          <li className='px-11 font-bold'>
            <Link to="/">Home</Link>
          </li>
          <li className='px-11 font-bold'>
            <Link to="/menu">Menu</Link>
          </li>
          <li className='px-11 font-bold'>
            <Link to="/about">About</Link>
          </li>
          <li className='px-11 font-bold'>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
        {/* Search */}
        <Search />
        {/* Start Order Button */}
        <button className='items-center bg-secondary text-[14px] text-white font-bold rounded-[50px] px-8 py-3'>
          Start Order
        </button>
        {/* Sign in Button */}
        {currentUser ? 
        <div 
        className='flex items-start relative flex-none'
        >
          <Link to="/profile/detail" 
          className='font-semibold'
          >
            <img src={profileIcon} 
            alt='Profile' 
            className='w-8'
            onMouseEnter={() => toggleNav(!isNavShowing)}
            /> 
          </Link>
          <nav 
          className={`${isNavShowing ? 'opacity-100' : 'opacity-0 pointer-events-none'} lg:mb-0 mb-10 absolute top-12 right-0 z-10 shadow-md border-[1px] transition-opacity rounded-lg bg-white p-3 w-32`}
          onMouseLeave={() => toggleNav(!isNavShowing)}>
            <ul className='space-y-1'>
              {/* Log out button */}
              <li
                className={'cursor-pointer px-3 py-2 transition duration-300 rounded-md text-red-500 hover:font-semibold'}>
                Log out
              </li>
            </ul>
          </nav>
        </div>
        : <Link to="/signin" className='font-semibold'>
          <h2>Sign in</h2>
        </Link>
        }
        {/* Divider */}
        |
        {/* Cart Button */}
        <div className=' h-[50px] w-[50px] flex-none relative'>
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

const mapDispatchToProps = dispatch => {
  return {
    initCart: (items) => dispatch(initCart(items))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Header)