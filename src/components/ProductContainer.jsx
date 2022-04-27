import React from 'react'
import ProductThumb from './ProductThumb'
import productThumb from '../images/ProductThumbImage.png'

// sample data
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
  {
    image: productThumb,
    title: 'Hamburgers And Chips Meal',
    calories: 6750,
    category: 'Sides',
    price: 59.99
  },
  {
    image: productThumb,
    title: 'Hamburgers And Chips Meal',
    calories: 6750,
    category: 'Desserts',
    price: 59.99
  },
  {
    image: productThumb,
    title: 'Hamburgers And Chips Meal',
    calories: 6750,
    category: 'Drinks',
    price: 59.99
  },
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
  {
    image: productThumb,
    title: 'Hamburgers And Chips Meal',
    calories: 6750,
    category: 'Sides',
    price: 59.99
  },
  {
    image: productThumb,
    title: 'Hamburgers And Chips Meal',
    calories: 6750,
    category: 'Desserts',
    price: 59.99
  },
  {
    image: productThumb,
    title: 'Hamburgers And Chips Meal',
    calories: 6750,
    category: 'Drinks',
    price: 59.99
  },
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
  {
    image: productThumb,
    title: 'Hamburgers And Chips Meal',
    calories: 6750,
    category: 'Sides',
    price: 59.99
  },
  {
    image: productThumb,
    title: 'Hamburgers And Chips Meal',
    calories: 6750,
    category: 'Desserts',
    price: 59.99
  },
  {
    image: productThumb,
    title: 'Hamburgers And Chips Meal',
    calories: 6750,
    category: 'Drinks',
    price: 59.99
  },
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
  {
    image: productThumb,
    title: 'Hamburgers And Chips Meal',
    calories: 6750,
    category: 'Sides',
    price: 59.99
  },
  {
    image: productThumb,
    title: 'Hamburgers And Chips Meal',
    calories: 6750,
    category: 'Desserts',
    price: 59.99
  },
  {
    image: productThumb,
    title: 'Hamburgers And Chips Meal',
    calories: 6750,
    category: 'Drinks',
    price: 59.99
  },
]

// Split products into multiple arrays based on category
const productByCategory = productData.reduce((arr, item) => {
  arr[item.category] = [...(arr[item.category] || []), item];
  return arr;
}, {});

// Generate products that have the same category as specified category (c is the specified category)
const generateProductOfCategory = (c, productData, myRef, i) => {
  return <div className='mb-20' ref={(ref) => { myRef[i] = ref }}>
    {/* title */}
    <h1 className='text-34 font-extrabold'>{c}</h1>

    {/* divider */}
    <div className='border-t-[1px] border-[#ABABAB] mt-2' />

    {/* products */}
    <div className='grid mt-6 grid-cols-3 gap-y-6 justify-between gap-x-8'>
      {productData.map((p, index) => {
        return <ProductThumb key={index} product={p} />
      })}
    </div>
  </div>
}

const ProductContainer = ({ categories, myRef }) => {
  // Create multiple refs for scrolling purpose


  return (<div>

    <div>
      {categories.map((c, i) => generateProductOfCategory(c, productByCategory[c], myRef, i))}
    </div>

  </div>
  )
}

export default ProductContainer