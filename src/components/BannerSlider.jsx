import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import api from '../api/appApi'
import * as routes from '../api/apiRoutes'
import { hambursyLoader } from '../components/LoadingScreen'
import Slide1 from '../images/slides/slide-1.jpg'
import Slide2 from '../images/slides/slide-2.jpg'

const BannerSlider = () => {
    const [loading, setLoading] = useState(true)
    const [promotions,setPromotions] = useState(null)

    const fetchPromotion = async () => {
        try {
            let result = await api.get(routes.GET_CURRENT_PROMOTION)
            console.log(result)
            if (result.data.promotions!=null)
              setPromotions(result.data.promotions)
        }
        catch (err) {
            if (err.response) {
              console.log(err.response.data)
              console.log(err.response.status)
              console.log(err.response.headers)
            } else {
              console.log(err.message)
            }
          } finally {
            setLoading(false)
          }
    }

    useEffect(() => {
        fetchPromotion()
        console.log(promotions)
    },[])

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: true,
        cssEase: 'linear'
    };
    if (loading)
        return hambursyLoader
    return (
        <Slider {...settings} className="w-screen">
          <div>
            <img src={promotions.banner} alt="Slide" className="w-screen"/>
          </div>
          <div>
            <img src={Slide2} alt="Slide" className="w-screen"/>
          </div>
          <div>
            <img src={Slide1} alt="Slide" className="w-screen"/>
          </div>
        </Slider>
    );
}

export default BannerSlider