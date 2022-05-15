import React from 'react'
import ProductThumb from './ProductThumb'
import productThumb from '../images/ProductThumbImage.png'

const FavoriteItems = () => {
    const productData = [
        {
          image: productThumb,
          title: 'Hamburgers And Chips Meal',
          calories: 6750,
          category: 'Featured',
          price: 59.99
        },
        {
          image: productThumb,
          title: 'Hamburgers And Chips Meal',
          calories: 6750,
          category: 'Combos',
          price: 59.99
        },
        {
          image: productThumb,
          title: 'Hamburgers And Chips Meal',
          calories: 6750,
          category: 'Hamburgers',
          price: 59.99
        },
        {
          image: productThumb,
          title: 'Hamburgers And Chips Meal',
          calories: 6750,
          category: 'Chicken',
          price: 59.99
        },
        {
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
        className=" w-[3500px] grid grid-rows-1 grid-flow-col gap-x-10 mb-10"
        >  
            {/* TRY ONE OF THESE FAVORITES */}
            <div className='ml-10 w-96'>
              <h2 className='text-[55px] text-[#5E5E64] font-extrabold mt-52'>TRY ONE OF THESE FAVORITES</h2>
            </div>
            {/* Product Thumbs */}
            {productData.map((p, i) => {
                return <ProductThumb key={i} product={p} />
              })}
        </div>
    </div>
  )
}

export default FavoriteItems