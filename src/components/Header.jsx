import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { connect, useDispatch, useSelector } from 'react-redux'
import Search from '../components/Search'
import Logo from './Logo'
import cartIcon from '../images/Cart.png'
import profileIcon from '../images/profileIcon.png'
import api from '../api/appApi'
import * as routes from '../api/apiRoutes'
import { initCart } from '../actions/cart-actions'
import AlertModal from './modals/AlertModal'
import useModal from '../utils/useModal'
import { logoutInitiate } from '../actions'

const Header = ({ qty, initCart }) => {
  // const [nav,setNav] = useState(false)
  // const handleClick = () => setNav(!nav)

  const [cartCount, setCartCount] = useState(0)
  const [isNavShowing, toggleNav] = useState(false)
  const { isShowing, toggle } = useModal()
  const { currentUser } = useSelector(state => state.user)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  let items
  const fetchCartCount = async () => {
    try {
      const token = await currentUser.getIdToken()

      let result = await api.get(
        routes.DISPLAY_CART_ITEM,
        routes.getAccessTokenHeader(token)
      )

      items = result.data.cartItems

      let count = 0

      for (let i = 0; i < items.length; i++) {
        count += items[i].number || 0
      }

      setCartCount(count)

      initCart(count)
    } catch (err) {
      console.log(err)
    }
  }

  // Get cart count
  useEffect(() => {
    if (!currentUser) {
      setCartCount(0)
      initCart(0)
    } else {
      fetchCartCount()
    }
  }, [currentUser])

  // Set cart count
  useEffect(() => {
    fetchCartCount()
  }, [qty])

  const handleLogout = value => {
    if (value) {
      dispatch(logoutInitiate())
      navigate('/')
    }
  }

  return (
    <div className='w-screen h-[80px] bg-[#F8F8F8] fixed top-0 z-20'>
      {/* Header */}
      <div className='px-4 sm:px-8 md:px-16 xl:px-32 justify-between flex items-center w-full h-full '>
        {/* Logo */}
        <Logo />
        {/* Navbar */}
        <ul className='hidden mr-4 md:flex h-full place-items-center'>
          <Link
            to='/'
            className='px-11 font-bold hover:bg-white h-full grid content-center'
          >
            Home
          </Link>
          <Link
            to='/menu'
            className='px-11 font-bold hover:bg-white h-full grid content-center'
          >
            Menu
          </Link>
          <Link
            to='/about'
            className='px-11 font-bold hover:bg-white h-full grid content-center'
          >
            About
          </Link>
          <Link
            to='/contact'
            className='px-11 font-bold hover:bg-white h-full grid content-center'
          >
            Contact
          </Link>
        </ul>
        {/* Search */}
        <Search />
        {/* Start Order Button */}
        <button
          className='items-center bg-secondary text-[14px] text-white font-bold rounded-[50px] px-8 py-3'
          onClick={() => navigate('/menu')}
        >
          Start Order
        </button>
        {/* Sign in Button */}
        {currentUser ? (
          <div className='flex items-start relative flex-none'>
            <AlertModal
              isShowing={isShowing}
              msg='Are you sure you want to log out?'
              hide={toggle}
              setResult={handleLogout}
            />
            <Link to='/profile/detail' className='font-semibold'>
              <img
                src={profileIcon}
                alt='Profile'
                className='w-8'
                onMouseEnter={() => toggleNav(!isNavShowing)}
              />
            </Link>
            <nav
              className={`${
                isNavShowing ? 'opacity-100' : 'opacity-0 pointer-events-none'
              } lg:mb-0 mb-10 absolute top-12 right-0 z-10 shadow-md border-[1px] transition-opacity rounded-lg bg-white p-3 w-32`}
              onMouseLeave={() => toggleNav(!isNavShowing)}
            >
              <ul className='space-y-1'>
                {/* Log out button */}
                <li
                  className={
                    'cursor-pointer px-3 py-2 transition duration-300 rounded-md text-red-500 hover:font-semibold'
                  }
                  onClick={() => toggle()}
                >
                  Log out
                </li>
              </ul>
            </nav>
          </div>
        ) : (
          <Link to='/signin' className='font-semibold'>
            <h2>Sign in</h2>
          </Link>
        )}
        {/* Divider */}|{/* Cart Button */}
        <div className=' h-[50px] w-[50px] flex-none relative'>
          <Link to={'/cart'}>
            {/* Cart Icon */}
            <button className='bg-fixed static'>
              <img
                src={cartIcon}
                alt='cart'
                className='fill-current h-12 w-12'
              />
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
    qty: state.cart.qty
  }
}

const mapDispatchToProps = dispatch => {
  return {
    initCart: quantity => dispatch(initCart(quantity))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
