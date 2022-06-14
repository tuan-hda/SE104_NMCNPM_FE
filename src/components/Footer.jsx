import React from 'react'
import Logo from './Logo'
import facebookIcon from '../images/social_media_icons/facebook.png'
import instagramIcon from '../images/social_media_icons/instagram.png'
import twitterIcon from '../images/social_media_icons/twitter.png'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className='w-full h-[380px] bg-[#202124] mt-32 text-white text-[14px]'>
      {/* Calories Statement */}
      <div className='px-2 sm:px-8 md:px-16 xl:px-32 pt-10 items-center'>
        <h2>Calorie Statement</h2>
        <p>
          2,000 calories a day is used for general nutrition advice, but calorie
          needs vary. Additional nutrition information available upon request
          in-store and on kfc.com. Prices, participation, and product
          availability may vary.
        </p>
      </div>
      <div className='grid grid-cols-5 px-2 sm:px-8 md:px-16 xl:px-32 mt-14 '>
        {/* Logo */}
        <div className=' w-10'>
          <Logo textColor='white' width={60} />
        </div>
        {/* Hambursy Info */}
        <div>
          <h6 className='font-semibold'>Hambursy Info</h6>
          <ul>
            <li className='py-1 mt-4'>
              <Link to='/about'>About</Link>
            </li>
            <li className='py-1'>Message</li>
            <li className='py-1'>Services</li>
            <li className='py-1'>Team's Members</li>
          </ul>
        </div>
        {/* Careers */}
        <div>
          <h6 className='font-semibold'>Careers</h6>
          <ul>
            <li className='py-1 mt-4'>Restaurant Careers</li>
            <li className='py-1'>Corporate Careers</li>
            <li className='py-1'>Culture</li>
            <li className='py-1'>Growth</li>
          </ul>
        </div>
        {/* Resources */}
        <div>
          <h6 className='font-semibold'>Resources</h6>
          <ul>
            <li className='py-1 mt-4'>FAQs</li>
            <li className='py-1'>
              <Link to='/contact'>Contact</Link>
            </li>
            <li className='py-1'>Hambursy App</li>
          </ul>
        </div>
        {/* Social Media */}
        <div className='grid grid-cols-3 gap-x-1'>
          <img src={facebookIcon} alt='Facebook Icon' className='w-[50px]' />
          <img src={instagramIcon} alt='Instagram Icon' className='w-[50px]' />
          <img src={twitterIcon} alt='Twitter Icon' className='w-[50px]' />
        </div>
      </div>
    </div>
  )
}

export default Footer
