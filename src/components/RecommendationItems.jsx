import React from 'react'
import ProductThumb from './ProductThumb'
import productThumb from '../images/ProductThumbImage.png'

const RecommendationItems = () => {
    const productData = [
      {
        id:1,
        image: productThumb,
        title: 'Hamburgers And Chips Meal',
        calories: 6750,
        category: 'Featured',
        price: 59.99
      },
      {
        id:2,
        image: productThumb,
        title: 'Hamburgers And Chips Meal',
        calories: 6750,
        category: 'Combos',
        price: 59.99
      },
      {
        id:3,
        image: productThumb,
        title: 'Hamburgers And Chips Meal',
        calories: 6750,
        category: 'Hamburgers',
        price: 59.99
      },
      {
        id:4,
        image: productThumb,
        title: 'Hamburgers And Chips Meal',
        calories: 6750,
        category: 'Chicken',
        price: 59.99
      },
      {
        id:5,
        image: productThumb,
        title: 'Hamburgers And Chips Meal',
        calories: 6750,
        category: 'Rice',
        price: 59.99
      },
    ]


  return (
    <div
    id="scrollContainer"
    className="w-full overflow-x-scroll scrolling-touch items-start mb-8 overflow-y-hidden"
    >
        {/* Scroll Items */}
        <div
        className=" w-[2000px] grid grid-rows-1 grid-flow-col gap-x-16 mb-14"
        > 
            {/* Product Thumbs */}
            {productData.map((p, i) => {
                return <ProductThumb key={i} product={p} />
              })}
        </div>
    </div>
  )
}

export default RecommendationItems