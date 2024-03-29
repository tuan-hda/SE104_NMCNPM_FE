import React from 'react'
import aboutImage from '../images/about_hamburger.png'
import introductionImage from '../images/introduction-image.png'
import theGirlImage from '../images/about_theGirlImage.png'
import quote from '../images/about_quote.png'
import factoryImage from '../images/about_factoryImage.png'
import messageImage from '../images/about_message.png'
import openImage from '../images/about_247.png'
import deliveryImage from '../images/about_drivethru.png'
import drivethruImage from '../images/about_takeaway.png'
import partyImage from '../images/about_party.png'

const About = () => {
  return (
    <div className='px-32 py-32'>
        {/* About */}
        <div className='flex gap-24'>
            <div className='w-1/2'>
                <h1 className='font-bold text-[90px] text-[#202124] pt-20'>IF YOU LIKE HAMBURGER, THIS IS WHY</h1>
                <div className=' w-3/5 mt-32'>
                    <div className='flex items-center '>
                        <span className='font-semibold text-15'>About Hambursy</span>
                        {/* Divider */}
                        <span className='ml-4 border-t-[1px] border-divider flex-grow'/>
                    </div>
                    <p className='mt-4'>
                        We make delicious hamburgers. If they ever make a food hall of fame, our hamburger is gonna be a first-ballot inductee.
                    </p>
                </div>
                
            </div>
            <div className=''>
                <img src={aboutImage} alt="About"/>
            </div>
        </div>
        {/* Introduction */}
        <div className='flex gap-24 mt-20'>
            <img src={introductionImage} alt="Introduction" className=' w-3/5'/>
            <div className='mt-32'>
                <div className='flex items-center '>
                    <span className='font-semibold text-32'>INRODUCTION</span>
                    {/* Divider */}
                    <span className='ml-4 border-t-[1px] border-divider flex-grow'/>
                </div>
                <p className='mt-8'>
                Hambursy is a fast-food restaurant chain, came from Vietnam. Hambursy’s parent company is Hambursy Co.–The largest food corporation in Ho Chi Minh City, Vietnam. (Hambursy, 2022)                </p>
            </div>
        </div>
        {/* History */}
        <div className='flex gap-24 mt-20 flex-row-reverse'>
            <div className='w-1/5 h-1/5'>
                <div className='flex justify-start'>
                    <img src={theGirlImage} alt='The Girl' className='w-2/3 h-2/3'/>
                    <img src={quote} alt='Quote' className='w-1/5 h-1/5'/>
                </div>
                <img src={factoryImage} alt='Factory' className='mt-2'/>
            </div>
            <div className=' w-1/3 mt-10'>
                <div className='flex items-center '>
                    <span className='font-semibold text-32'>OUR HISTORY</span>
                    {/* Divider */}
                    <span className='ml-4 border-t-[1px] border-divider flex-grow'/>
                </div>
                    <h2 className='font-bold text-6xl mt-8 text-right'>THE GIRL,</h2>
                    <h2 className='font-bold text-6xl mt-4 text-right'>THE LEGEND</h2>
                <p className='mt-12 text-right'>
                It all began with the girl, the legend herself. In 2002, in a humble service station in Saigon, Vietnam, 19-year old Thu Trang began feeding hungry travellers. Trang Pham spent the next nine years (now that's dedication) perfecting her secret blend of 11 herbs and spices, as well as the basic cooking technique we still use today.
                In 2020, she founded a chain of restaurants called ‘Hambursy’. There are now over 2,000 Hambursy outlets in more than 30 provinces around Vietnam.                </p>
            </div>
        </div>
        {/* Message */}
        <div className='flex gap-24 mt-20'>
            <img src={messageImage} alt="Introduction" className=' w-3/5'/>
            <div className='mt-24'>
                <div className='flex items-center '>
                    <span className='font-semibold text-32'>OUR MESSAGE</span>
                    {/* Divider */}
                    <span className='ml-4 border-t-[1px] border-divider flex-grow'/>
                </div>
                <div className=' text-secondary text-40 font-bold italic mt-10'>
                    <h2>BE YOUR BEST SELF. </h2>
                    <h2>MAKE A DIFFERENCE. </h2>
                    <h2>HAVE FUN.</h2>
                </div>
                <p className='mt-8'>
                At Hambursy, we have a passion for food, and serve it with pride. We believe that you should come to work as the best version of yourself and treat every guest like a friend. And it’s our job to ensure that every guest leaves happy.                
                </p>
            </div>
        </div>
        {/* Services */}
        <div className='mt-32'>
            <div className='flex items-center mb-28'>
                <span className='font-semibold text-32'>OUR SERVICES</span>
                {/* Divider */}
                <span className='ml-4 border-t-[1px] border-divider w-48'/>
            </div>
            <div className='flex justify-between font-semibold'>
                <div className='grid place-items-center'>
                    <img src={openImage} alt='Open 24/7' className='w-1/2 mb-8'/>
                    <h3>Open 24/7</h3>
                </div>
                <div className='grid place-items-center'>
                    <img src={deliveryImage} alt='Delivery' className='w-1/2 mb-8'/>
                    <h3>Delivery</h3>
                </div>
                <div className='grid place-items-center'>
                    <img src={drivethruImage} alt='Drive-thru' className='w-1/2 mb-8'/>
                    <h3>Drive-thru</h3>
                </div>
                <div className='grid place-items-center'>
                    <img src={partyImage} alt='Party Celebrating' className='w-1/2 mb-8'/>
                    <h3>Party Celebrating</h3>
                </div>
            </div>
        </div>
    </div>
  )
}

export default About