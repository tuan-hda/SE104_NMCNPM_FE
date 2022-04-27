import React from 'react'
import productThumb from '../images/ProductThumbImage.png'
import ProductsByCategory from './ProductsByCategory';

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