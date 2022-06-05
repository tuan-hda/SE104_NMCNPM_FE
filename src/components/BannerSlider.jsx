import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slide1 from '../images/slides/slide-1.jpg'
import Slide2 from '../images/slides/slide-2.jpg'
import Slide3 from '../images/slides/slide-3.jpg'

const BannerSlider = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: true,
        cssEase: 'linear'
    };
    return (
        <Slider {...settings} className="w-screen">
            <div>
            <img src={Slide1} alt="Slide 1" className="w-screen"/>
            </div>
            <div>
            <img src={Slide2} alt="Slide 2" className="w-screen"/>
            </div>
            <div>
            <img src={Slide3} alt="Slide 3" className="w-screen"/>
            </div>
        </Slider>
    );
}

export default BannerSlider