import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AlertModal from '../components/modals/AlertModal'
import OrdersContainer from '../components/OrdersContainer'
import PasswordContainer from '../components/PasswordContainer'
import ProfileContainer from '../components/ProfileContainer'
import useModal from '../utils/useModal'

// Profile navbar data
const navbarData = [
  'Detail',
  'Password',
  'Orders'
]

const Profile = () => {
  const { isShowing, toggle } = useModal()
  const [initNav, setNav] = useState('')
  const navigate = useNavigate();

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

  return (
    <div className='mx-4 px-2 sm:px-8 md:px-16 xl:px-32 '>
      {/* Alert Modal trigger whenever user click log out */}
      <AlertModal msg='Are you sure you want to log out?'
        isShowing={isShowing}
        hide={toggle} />

      {/* Title */}
      <h1 className='font-extrabold text-32'>PROFILE</h1>

      {/* Divider */}
      <div className='border-gray-border border-t-[1px] mt-8' />

      <div className='mt-8 flex gap-36'>
        {/* Navigation Bar */}
        <nav className='w-40 lg:block hidden'>
          <ul className='space-y-5 text-15'>
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