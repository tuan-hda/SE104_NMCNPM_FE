import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logoutInitiate } from '../actions'
import AlertModal from '../components/modals/AlertModal'
import OrdersContainer from '../components/OrdersContainer'
import PasswordContainer from '../components/PasswordContainer'
import ProfileContainer from '../components/ProfileContainer'
import useModal from '../utils/useModal'

const menuSvg = <svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 512 512" className='w-6 h-6'>
  <g>
    <path d="M480,224H32c-17.673,0-32,14.327-32,32s14.327,32,32,32h448c17.673,0,32-14.327,32-32S497.673,224,480,224z" />
    <path d="M32,138.667h448c17.673,0,32-14.327,32-32s-14.327-32-32-32H32c-17.673,0-32,14.327-32,32S14.327,138.667,32,138.667z" />
    <path d="M480,373.333H32c-17.673,0-32,14.327-32,32s14.327,32,32,32h448c17.673,0,32-14.327,32-32S497.673,373.333,480,373.333z" />
  </g>

</svg>

// Profile navbar data
const navbarData = [
  'Detail',
  'Password',
  'Orders'
]

const Profile = () => {
  const { isShowing, toggle } = useModal()
  const [initNav, setNav] = useState('')
  const [isNavShowing, toggleNav] = useState(false);
  const [res, setRes] = useState()
  const navigate = useNavigate();

  const dispatch = useDispatch()

  // Get current nav based on URL
  useEffect(() => {
    setNav(window.location.pathname.substring(9));
  }, [navigate])

  // Switch to other nav
  const handleNavClick = (navData) => {
    const path = String(navData).toLowerCase();
    navigate('/profile/' + path)
  }

  const navItemStyle = 'cursor-pointer px-3 py-2 transition duration-300 rounded-md '

  const getCurrentContainer = () => {
    switch (initNav) {
      case navbarData[0].toLowerCase():
        return <ProfileContainer />
      case navbarData[1].toLowerCase():
        return <PasswordContainer />
      case navbarData[2].toLowerCase():
        return <OrdersContainer />
      default: break;
    }
  }

  if (!isNaN(res) && res === 1) {
    dispatch(logoutInitiate())
    navigate('/')
  }

  return (
    <div className='px-2 sm:px-8 md:px-16 xl:px-32 '>
      {/* Alert Modal trigger whenever user click log out */}
      <AlertModal msg='Are you sure you want to log out?'
        isShowing={isShowing}
        hide={toggle}
        setResult={setRes} />

      <div className='flex justify-between items-center'>
        {/* Title */}
        <h1 className='font-extrabold text-32'>PROFILE</h1>

        {/* Small devices navigation bar */}
        <div className='lg:hidden flex items-start relative'>
          <button className='p-3 bg-blue-nav rounded-lg hover:bg-blue-hover transition duration-300' onClick={() => toggleNav(!isNavShowing)}>
            {menuSvg}
          </button>

          {/* Small devices navigation bar */}
          <nav className={`${isNavShowing ? 'opacity-100' : 'opacity-0 pointer-events-none'} lg:mb-0 mb-10 absolute top-12 right-0 z-10 shadow-md border-[1px] transition-opacity rounded-lg bg-white p-4 pr-10 w-52`}>
            <ul className='space-y-2' onClick={() => toggleNav(!isNavShowing)}>
              {/* Profile, Password, Orders */}
              {navbarData.map((d, i) => <li
                key={i}
                className={d.toLowerCase() === initNav ?
                  navItemStyle + 'font-semibold' :
                  navItemStyle + 'hover:font-semibold'}
                onClick={() => { handleNavClick(d) }}>
                {d}
              </li>)}

              {/* Log out button */}
              <li
                className={navItemStyle + 'text-red-500 hover:font-semibold duration-300'}
                onClick={toggle}>
                Log out
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Divider */}
      <div className='border-gray-border border-t-[1px] mt-8' />

      <div className='mt-8 lg:flex gap-36'>


        {/* Navigation Bar */}
        <nav className={`w-40 hidden lg:block lg:mb-0 mb-10`}>
          <ul className='lg:space-y-5 text-15'>
            {/* Profile, Password, Orders */}
            {navbarData.map((d, i) => <li
              key={i}
              className={d.toLowerCase() === initNav ?
                navItemStyle + 'font-semibold bg-blue-nav ' :
                navItemStyle + 'hover:font-semibold'}
              onClick={() => handleNavClick(d)}>
              {d}
            </li>)}

            {/* Log out button */}
            <li
              className={navItemStyle + 'text-red-500 hover:font-semibold duration-300'}
              onClick={toggle}>
              Log out
            </li>
          </ul>
        </nav>

        {/* Container for profile/password/orders */}
        <div className='w-full'>
          {getCurrentContainer()}
        </div>
      </div>
    </div>
  )
}

export default Profile