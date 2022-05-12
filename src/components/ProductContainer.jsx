import React from 'react'
import productThumb from '../images/ProductThumbImage.png'
import ProductsByCategory from './ProductsByCategory';

// sample data
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
  {
    id:6,
    image: productThumb,
    title: 'Hamburgers And Chips Meal',
    calories: 6750,
    category: 'Sides',
    price: 59.99
  },
  {
    id:7,
    image: productThumb,
    title: 'Hamburgers And Chips Meal',
    calories: 6750,
    category: 'Desserts',
    price: 59.99
  },
  {
    id:8,
    image: productThumb,
    title: 'Hamburgers And Chips Meal',
    calories: 6750,
    category: 'Drinks',
    price: 59.99
  },
  {
    id:9,
    image: productThumb,
    title: 'Hamburgers And Chips Meal',
    calories: 6750,
    category: 'Featured',
    price: 59.99
  },
  {
    id:10,
    image: productThumb,
    title: 'Hamburgers And Chips Meal',
    calories: 6750,
    category: 'Combos',
    price: 59.99
  },
  {
    id:11,
    image: productThumb,
    title: 'Hamburgers And Chips Meal',
    calories: 6750,
    category: 'Hamburgers',
    price: 59.99
  },
  {
    id:12,
    image: productThumb,
    title: 'Hamburgers And Chips Meal',
    calories: 6750,
    category: 'Chicken',
    price: 59.99
  },
  {
    id:13,
    image: productThumb,
    title: 'Hamburgers And Chips Meal',
    calories: 6750,
    category: 'Rice',
    price: 59.99
  },
  {
    id:14,
    image: productThumb,
    title: 'Hamburgers And Chips Meal',
    calories: 6750,
    category: 'Sides',
    price: 59.99
  },
  {
    id:15,
    image: productThumb,
    title: 'Hamburgers And Chips Meal',
    calories: 6750,
    category: 'Desserts',
    price: 59.99
  },
  {
    id:16,
    image: productThumb,
    title: 'Hamburgers And Chips Meal',
    calories: 6750,
    category: 'Drinks',
    price: 59.99
  },
  {
    id:17,
    image: productThumb,
    title: 'Hamburgers And Chips Meal',
    calories: 6750,
    category: 'Featured',
    price: 59.99
  },
  {
    id:18,
    image: productThumb,
    title: 'Hamburgers And Chips Meal',
    calories: 6750,
    category: 'Combos',
    price: 59.99
  },
  {
    id:19,
    image: productThumb,
    title: 'Hamburgers And Chips Meal',
    calories: 6750,
    category: 'Hamburgers',
    price: 59.99
  },
  {
    id:20,
    image: productThumb,
    title: 'Hamburgers And Chips Meal',
    calories: 6750,
    category: 'Chicken',
    price: 59.99
  },
  {
    id:21,
    image: productThumb,
    title: 'Hamburgers And Chips Meal',
    calories: 6750,
    category: 'Rice',
    price: 59.99
  },
  {
    id:22,
    image: productThumb,
    title: 'Hamburgers And Chips Meal',
    calories: 6750,
    category: 'Sides',
    price: 59.99
  },
  {
    id:23,
    image: productThumb,
    title: 'Hamburgers And Chips Meal',
    calories: 6750,
    category: 'Desserts',
    price: 59.99
  },
  {
    id:24,
    image: productThumb,
    title: 'Hamburgers And Chips Meal',
    calories: 6750,
    category: 'Drinks',
    price: 59.99
  },
  {
    id:25,
    image: productThumb,
    title: 'Hamburgers And Chips Meal',
    calories: 6750,
    category: 'Featured',
    price: 59.99
  },
  {
    id:26,
    image: productThumb,
    title: 'Hamburgers And Chips Meal',
    calories: 6750,
    category: 'Combos',
    price: 59.99
  },
  {
    id:27,
    image: productThumb,
    title: 'Hamburgers And Chips Meal',
    calories: 6750,
    category: 'Hamburgers',
    price: 59.99
  },
  {
    id:28,
    image: productThumb,
    title: 'Hamburgers And Chips Meal',
    calories: 6750,
    category: 'Chicken',
    price: 59.99
  },
  {
    id:29,
    image: productThumb,
    title: 'Hamburgers And Chips Meal',
    calories: 6750,
    category: 'Rice',
    price: 59.99
  },
  {
    id:30,
    image: productThumb,
    title: 'Hamburgers And Chips Meal',
    calories: 6750,
    category: 'Sides',
    price: 59.99
  },
  {
    id:31,
    image: productThumb,
    title: 'Hamburgers And Chips Meal',
    calories: 6750,
    category: 'Desserts',
    price: 59.99
  },
  {
    id:32,
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

const ProductContainer = ({ categories, myRef }) => {
  return (<div>

    <div>
      {
        categories.map((c, i) => {
          return <ProductsByCategory
            category={c}
            productData={productByCategory[c]}
            myRef={myRef}
            index={i}
          />
        })
      }
    </div>

  </div>
  )
}

export default ProductContainer