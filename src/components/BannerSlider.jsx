import React from 'react'
import Slide1 from '../images/slides/slide-1.jpg'
import Slide2 from '../images/slides/slide-2.jpg'
import Slide3 from '../images/slides/slide-3.jpg'

const BannerSlider = () => {
    const onCheck = () => {

    }
  return (
    <div className="carousel relative shadow-2xl bg-white">
        <div className="carousel-inner relative overflow-hidden w-full">
            {/*Slide 1*/}
            <input className="carousel-open" type="radio" id="carousel-1" name="carousel" aria-hidden="true" hidden="" checked="checked" onChange={onCheck}/>
            <div className="carousel-item absolute opacity-0" style={{height:700}}>
                <div className="block h-full w-full bg-indigo-500 text-white text-5xl text-center">
                    <img src={Slide1} alt="Slide 1" className='w-full'/>
                </div>
            </div>
            <label htmlFor="carousel-3" className="prev control-1 w-10 h-10 ml-2 md:ml-10 absolute cursor-pointer hidden text-3xl font-bold text-black hover:text-white rounded-full bg-white hover:bg-primary leading-tight text-center z-10 inset-y-0 left-0 my-auto">‹</label>
            <label htmlFor="carousel-2" className="next control-1 w-10 h-10 mr-2 md:mr-10 absolute cursor-pointer hidden text-3xl font-bold text-black hover:text-white rounded-full bg-white hover:bg-primary leading-tight text-center z-10 inset-y-0 right-0 my-auto">›</label>
            {/*Slide 2*/}
            <input className="carousel-open" type="radio" id="carousel-2" name="carousel" aria-hidden="true" hidden=""/>
            <div className="carousel-item absolute opacity-0" style={{height:700}}>
                <div className="block h-full w-full bg-orange-500 text-white text-5xl text-center">
                    <img src={Slide2} alt="Slide 2" className='w-full'/>
                </div>
            </div>
            <label htmlFor="carousel-1" className="prev control-2 w-10 h-10 ml-2 md:ml-10 absolute cursor-pointer hidden text-3xl font-bold text-black hover:text-white rounded-full bg-white hover:bg-primary leading-tight text-center z-10 inset-y-0 left-0 my-auto">‹</label>
            <label htmlFor="carousel-3" className="next control-2 w-10 h-10 mr-2 md:mr-10 absolute cursor-pointer hidden text-3xl font-bold text-black hover:text-white rounded-full bg-white hover:bg-primary leading-tight text-center z-10 inset-y-0 right-0 my-auto">›</label> 
            
            {/*Slide 3*/}
            <input className="carousel-open" type="radio" id="carousel-3" name="carousel" aria-hidden="true" hidden=""/>
            <div className="carousel-item absolute opacity-0" style={{height:700}}>
                <div className="block h-full w-full bg-green-500 text-white text-5xl text-center">
                    <img src={Slide3} alt="Slide 3" className='w-full'/>
                </div>
            </div>
            <label htmlFor="carousel-2" className="prev control-3 w-10 h-10 ml-2 md:ml-10 absolute cursor-pointer hidden text-3xl font-bold text-black hover:text-white rounded-full bg-white hover:bg-primary leading-tight text-center z-10 inset-y-0 left-0 my-auto">‹</label>
            <label htmlFor="carousel-1" className="next control-3 w-10 h-10 mr-2 md:mr-10 absolute cursor-pointer hidden text-3xl font-bold text-black hover:text-white rounded-full bg-white hover:bg-primary leading-tight text-center z-10 inset-y-0 right-0 my-auto">›</label>

            {/* Add additional indicators htmlFor each slide*/}
            <ol className="carousel-indicators">
                <li className="inline-block mr-3">
                    <label htmlFor="carousel-1" className="carousel-bullet cursor-pointer block text-4xl text-white hover:text-primary">•</label>
                </li>
                <li className="inline-block mr-3">
                    <label htmlFor="carousel-2" className="carousel-bullet cursor-pointer block text-4xl text-white hover:text-primary">•</label>
                </li>
                <li className="inline-block mr-3">
                    <label htmlFor="carousel-3" className="carousel-bullet cursor-pointer block text-4xl text-white hover:text-primary">•</label>
                </li>
            </ol>
            
        </div>
    </div>
  )
}

export default BannerSlider