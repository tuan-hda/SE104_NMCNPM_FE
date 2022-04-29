import React, { useState } from 'react'
import OrdersContainer from '../components/OrdersContainer'
import PasswordContainer from '../components/PasswordContainer'
import ProfileContainer from '../components/ProfileContainer'

// Profile navbar data
const navbarData = [
  'Profile',
  'Password',
  'Orders'
]

const Profile = () => {
  const [currNav, setNav] = useState('Profile')

  const handleNavClick = (navData) => {
    setNav(navData)
  }

  const navItemStyle = 'cursor-pointer px-3 py-2 transition duration-300 rounded-md '

  const getCurrentContainer = () => {
    switch (currNav) {
      case navbarData[0]:
        return <ProfileContainer />
      case navbarData[1]:
        return <PasswordContainer />
      case navbarData[2]:
        return <OrdersContainer />
      default: break;
    }
  }

  return (
    <div className='pt-10 px-32'>
      {/* Title */}
      <h1 className='font-extrabold text-32'>PROFILE</h1>

      {/* Divider */}
      <div className='border-gray-border border-t-[1px] mt-8' />

      <div className='mt-8 flex'>
        {/* Navigation Bar */}
        <nav className='w-40'>
          <ul className='space-y-5 text-15'>
            {/* Profile, Password, Orders */}
            {navbarData.map((d, i) => <li
              key={i}
              className={d === currNav ?
                navItemStyle + 'font-semibold bg-blue-nav ' :
                navItemStyle + 'hover:font-semibold'}
              onClick={() => handleNavClick(d)}>
              {d}
            </li>)}

            {/* Log out button */}
            <li className={navItemStyle + 'text-red-500 hover:font-semibold duration-300'}>
              Log out
            </li>
          </ul>
        </nav>

        {/* Container for profile/password/orders */}
        <div className='ml-36 w-full'>
          {getCurrentContainer()}
        </div>
      </div>
    </div >
  )
}

export default Profile