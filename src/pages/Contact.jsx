import React from 'react'
import ContactImage from '../images/ContactImage.jpg'

const divider = <div className='w-full border-[1px] border-gray-border mt-2' />

const Contact = () => {
  return <div className='pt-10 px-32 flex justify-between'>
    {/* Contact. Including Phone, Live chat, Email, Store locator */}
    <div className='flex-1 mr-32'>
      {/* Title */}
      <h1 className='text-34 font-extrabold'>CONTACT HAMBURSY</h1>

      {/* Phone */}
      <div className='mt-9 text-13'>
        <h2 className='font-bold text-base'>PHONE</h2>

        {divider}

        <p className='mt-2'>Hotline: <a href='tel:+0123456789' className='font-bold text-primary'>0123 456 789</a> </p>
        <p className='mt-2 text-justify'>Our Client Advisors are available Monday through Saturday, 9:00AM - 11:00PM and Sunday, 10:00AM - 9:00PM, excluding holidays.</p>

      </div>

      {/* Live chat */}
      <div className='mt-9 text-13'>
        <h2 className='font-bold text-base'>LIVE CHAT</h2>

        {divider}

        <p className='mt-2'>You can chat with us <a target='blank' href='https://www.facebook.com/hdatdragon2849/' className='font-bold text-primary'>here</a>. </p>
        <p className='mt-2 text-justify'>Our Client Advisors are available to chat Monday through Saturday, 9:00AM - 11:00PM and Sunday, 10:00AM - 9:00PM, excluding holidays. The option to chat will become active during these hours once an advisor is available.</p>

      </div>

      {/* Email */}
      <div className='mt-9 text-13'>
        <h2 className='font-bold text-base'>EMAIL</h2>

        {divider}

        <p className='mt-2'>You can contact us by email at: <a href='mailto:support@hambursy.com' className='font-bold text-primary'>support@hambursy.com</a> </p>
        <p className='mt-2 text-justify'>In case you can’t contact us via Phone or Live Chat, please send an email to us. Unlike Calling and Live Chat, Emails will be answered in turn. We are commited to the fastest response, usually in minutes.</p>

      </div>

      {/* Store locator */}
      <div className='mt-9 text-13'>
        <h2 className='font-bold text-base'>STORE LOCATOR</h2>

        {divider}

        <p className='mt-2'>You can locate our stores <a target='blank' href='https://www.facebook.com/hdatdragon2849/' className='font-bold text-primary'>here</a>. </p>

      </div>

    </div>

    {/* Contact hambursy image */}
    <div className='w-[328px]'>
      <img
        className='rounded-lg h-full object-cover object-[-140px]'
        src={ContactImage}
        alt='Contact Hambursy' />
    </div>

  </div>
}

export default Contact

