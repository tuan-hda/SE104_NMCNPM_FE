import React from 'react'
import aboutImage from '../images/about_hamburger.png'
import introductionImage from '../images/introduction-image.png'

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
            <img src={introductionImage} alt="Introduction"/>
            <div>
            </div>
        </div>
    </div>
  )
}

export default About