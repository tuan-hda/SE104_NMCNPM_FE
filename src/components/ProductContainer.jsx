import React, { useEffect, useState } from 'react'
import productThumb from '../images/ProductThumbImage.png'
import ProductsByCategory from './ProductsByCategory';
import api from '../api/appApi'
import * as routes from '../api/apiRoutes'

// sample data
const productData = [
  {
    id: 1,
    image: productThumb,
    title: 'Hamburgers And Chips Meal',
    calories: 6750,
    category: 'Featured',
    price: 59.99
  },
  {
    id: 2,
    image: productThumb,
    title: 'Hamburgers And Chips Meal',
    calories: 6750,
    category: 'Combos',
    price: 59.99
  },
  {
    id: 3,
    image: productThumb,
    title: 'Hamburgers And Chips Meal',
    calories: 6750,
    category: 'Hamburgers',
    price: 59.99
  },
  {
    id: 4,
    image: productThumb,
    title: 'Hamburgers And Chips Meal',
    calories: 6750,
    category: 'Chicken',
    price: 59.99
  },
  {
    id: 5,
    image: productThumb,
    title: 'Hamburgers And Chips Meal',
    calories: 6750,
    category: 'Rice',
    price: 59.99
  },
  {
    id: 6,
    image: productThumb,
    title: 'Hamburgers And Chips Meal',
    calories: 6750,
    category: 'Sides',
    price: 59.99
  },
  {
    id: 7,
    image: productThumb,
    title: 'Hamburgers And Chips Meal',
    calories: 6750,
    category: 'Desserts',
    price: 59.99
  },
  {
    id: 8,
    image: productThumb,
    title: 'Hamburgers And Chips Meal',
    calories: 6750,
    category: 'Drinks',
    price: 59.99
  },
  {
    id: 9,
    image: productThumb,
    title: 'Hamburgers And Chips Meal',
    calories: 6750,
    category: 'Featured',
    price: 59.99
  },
  {
    id: 10,
    image: productThumb,
    title: 'Hamburgers And Chips Meal',
    calories: 6750,
    category: 'Combos',
    price: 59.99
  },
  {
    id: 11,
    image: productThumb,
    title: 'Hamburgers And Chips Meal',
    calories: 6750,
    category: 'Hamburgers',
    price: 59.99
  },
  {
    id: 12,
    image: productThumb,
    title: 'Hamburgers And Chips Meal',
    calories: 6750,
    category: 'Chicken',
    price: 59.99
  },
  {
    id: 13,
    image: productThumb,
    title: 'Hamburgers And Chips Meal',
    calories: 6750,
    category: 'Rice',
    price: 59.99
  },
  {
    id: 14,
    image: productThumb,
    title: 'Hamburgers And Chips Meal',
    calories: 6750,
    category: 'Sides',
    price: 59.99
  },
  {
    id: 15,
    image: productThumb,
    title: 'Hamburgers And Chips Meal',
    calories: 6750,
    category: 'Desserts',
    price: 59.99
  },
  {
    id: 16,
    image: productThumb,
    title: 'Hamburgers And Chips Meal',
    calories: 6750,
    category: 'Drinks',
    price: 59.99
  },
  {
    id: 17,
    image: productThumb,
    title: 'Hamburgers And Chips Meal',
    calories: 6750,
    category: 'Featured',
    price: 59.99
  },
  {
    id: 18,
    image: productThumb,
    title: 'Hamburgers And Chips Meal',
    calories: 6750,
    category: 'Combos',
    price: 59.99
  },
  {
    id: 19,
    image: productThumb,
    title: 'Hamburgers And Chips Meal',
    calories: 6750,
    category: 'Hamburgers',
    price: 59.99
  },
  {
    id: 20,
    image: productThumb,
    title: 'Hamburgers And Chips Meal',
    calories: 6750,
    category: 'Chicken',
    price: 59.99
  },
  {
    id: 21,
    image: productThumb,
    title: 'Hamburgers And Chips Meal',
    calories: 6750,
    category: 'Rice',
    price: 59.99
  },
  {
    id: 22,
    image: productThumb,
    title: 'Hamburgers And Chips Meal',
    calories: 6750,
    category: 'Sides',
    price: 59.99
  },
  {
    id: 23,
    image: productThumb,
    title: 'Hamburgers And Chips Meal',
    calories: 6750,
    category: 'Desserts',
    price: 59.99
  },
  {
    id: 24,
    image: productThumb,
    title: 'Hamburgers And Chips Meal',
    calories: 6750,
    category: 'Drinks',
    price: 59.99
  },
  {
    id: 25,
    image: productThumb,
    title: 'Hamburgers And Chips Meal',
    calories: 6750,
    category: 'Featured',
    price: 59.99
  },
  {
    id: 26,
    image: productThumb,
    title: 'Hamburgers And Chips Meal',
    calories: 6750,
    category: 'Combos',
    price: 59.99
  },
  {
    id: 27,
    image: productThumb,
    title: 'Hamburgers And Chips Meal',
    calories: 6750,
    category: 'Hamburgers',
    price: 59.99
  },
  {
    id: 28,
    image: productThumb,
    title: 'Hamburgers And Chips Meal',
    calories: 6750,
    category: 'Chicken',
    price: 59.99
  },
  {
    id: 29,
    image: productThumb,
    title: 'Hamburgers And Chips Meal',
    calories: 6750,
    category: 'Rice',
    price: 59.99
  },
  {
    id: 30,
    image: productThumb,
    title: 'Hamburgers And Chips Meal',
    calories: 6750,
    category: 'Sides',
    price: 59.99
  },
  {
    id: 31,
    image: productThumb,
    title: 'Hamburgers And Chips Meal',
    calories: 6750,
    category: 'Desserts',
    price: 59.99
  },
  {
    id: 32,
    image: productThumb,
    title: 'Hamburgers And Chips Meal',
    calories: 6750,
    category: 'Drinks',
    price: 59.99
  },
]

// Split products into multiple arrays based on category
const productByCategory = (products) => products.reduce((arr, item) => {
  arr[item.typeData.value] = [...(arr[item.typeData.value] || []), item];
  return arr;
}, {});

const getFeaturedItems = (products) => products.filter(product => product.featuredData.value === 'Yes')

const ProductContainer = ({ categories, myRef, isVisible, setIsVisible }) => {
  const [product, setProduct] = useState({})
  const [loading, setLoading] = useState(true)

  const fetchMenu = async () => {
    try {
      const result = await api.get(routes.GET_ITEM, routes.getItemParams('ALL'))
      setProduct(result.data.items)

      // Split product list by category
      let productByCategoryList = {}
      productByCategoryList = productByCategory(result.data.items)
      productByCategoryList['Featured'] = getFeaturedItems(result.data.items)
      setProduct(productByCategoryList)
    } catch (err) {
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
    fetchMenu()
  }, [])

  return (loading ?
    <div></div>
    :
    <div>
      {Object.keys(product) !== 0 &&
        categories.map((c, i) => {
          return <ProductsByCategory
            category={c}
            productData={product[c] || []}
            isVisible={isVisible}
            setIsVisible={setIsVisible}
            myRef={myRef}
            index={i}
          />
        })
      }
    </div>
  )
}

export default ProductContainer