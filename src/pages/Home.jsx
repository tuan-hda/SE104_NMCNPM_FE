import React from 'react'
import OrderNowBanner from '../images/order-now.jpg'
import RecommendationItems from '../components/RecommendationItems'
import FavoriteItems from '../components/FavoriteItems'
import BannerSlider from '../components/BannerSlider'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      {/* Banner Slider */}
      <BannerSlider />
      {/* Recommendation Items */}
      <div className='px-32 mt-20'>
        <h1 className='text-34 font-extrabold mb-10'>RECOMMENDATION ITEMS</h1>
        <RecommendationItems />
      </div>

      {/* Favorite Items */}
      <div className='px-0 mt-20'>
        <FavoriteItems />
      </div>

      {/* Start Order Now */}
      <div className='relative mt-24'>
        <img src={OrderNowBanner} alt='Start Order Now' />
        {/* Start Order Now Button */}
        <Link to='/menu'>
          <button className='absolute bottom-[75px] right-72 items-center bg-white text-[26px] text-secondary font-bold rounded-[22px] w-70 h-20 px-10'>
            Start Order Now
          </button>
        </Link>
      </div>
      {/* Newsletter */}
      <div className='px-32 mt-20'>
        <h2 className='text-34 font-bold text-[#202124] border-b-[1px] border-divider'>
          DELICIOUS NEWS IN YOUR MAILBOX
        </h2>
        <p className='text-[18px] mt-8'>
          Here you can subscribe to our{' '}
          <span className='text-secondary font-medium'>newsletter</span>, which
          we send out several times a year. By clicking on "Register", you agree
          that we, Hambursy, can send you the latest information about our
          products and services to the email address you entered [matching your
          Interests and Preferences]. That way you won't miss any promotions or
          campaigns from Hambursy, you'll always get the latest vouchers and
          you'll find out what else is going on at Hambursy.
        </p>
        <div>
          <input
            className='mt-20 w-[900px] border-b-[1px] border-black text-20'
            type='email'
            placeholder='E-mail address*'
            name='email'
          />
          {/* Register Button */}
          <button className='items-center ml-10 bg-secondary text-[18px] text-white font-bold rounded-[15px] w-50 h-12 px-10'>
            Register
          </button>
        </div>
        <h2 className='text-[18px] mt-8'>
          By clicking on “Register”, you agree to our{' '}
          <span className='font-medium'>Terms & Conditions</span>.
        </h2>
      </div>
    </div>
  )
}

export default Home
