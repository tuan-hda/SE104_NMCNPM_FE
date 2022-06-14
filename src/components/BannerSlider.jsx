import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slide1 from '../images/slides/slide-1.jpg'
import Slide2 from '../images/slides/slide-2.jpg'
import Slide3 from '../images/slides/slide-3.jpg'
import api from '../api/appApi'
import * as routes from '../api/apiRoutes'
import { hambursyLoader } from '../components/LoadingScreen'

const BannerSlider = () => {
    const [loading, setLoading] = useState(true)
    const [promotions,setPromotions] = useState([])

    const fetchPromotion = async () => {
        try {
            let result = await api.get(routes.GET_PROMOTION, routes.getPromotionParams('ALL'))
            console.log(result)
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
        {promotions.map((promotion, index) => (
          <div>
            <img src={promotion.banner} alt="Slide" className="w-screen"/>
          </div>
          ))}
        </Slider>
    );
}

export default BannerSlider