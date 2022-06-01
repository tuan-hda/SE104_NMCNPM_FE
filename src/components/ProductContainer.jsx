import React, { useEffect, useState } from 'react'
import ProductsByCategory from './ProductsByCategory';
import api from '../api/appApi'
import * as routes from '../api/apiRoutes'
import { useSearchParams } from 'react-router-dom';
import { hambursyLoader } from './LoadingScreen';

// Split products into multiple arrays based on category
const productByCategory = (products) => products.reduce((arr, item) => {
  arr[item.typeData.value] = [...(arr[item.typeData.value] || []), item];
  return arr;
}, {});

const getFeaturedItems = (products) => products.filter(product => product.featuredData.value === 'Yes')

const ProductContainer = ({ categories, myRef, isVisible, setIsVisible, searchValue }) => {
  const [product, setProduct] = useState({})
  const [loading, setLoading] = useState(true)

  const [searchParams,] = useSearchParams()

  const fetchMenu = async () => {
    try {
      let result

      if (!searchValue) {
        result = await api.get(routes.GET_ITEM, routes.getItemParams('ALL'))
      } else {
        const searchName = searchParams.get('name')
        result = await api.get(routes.SEARCH_ITEM, routes.getSearchBody(searchName))
      }
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

  if (loading) return (
    <div className='w-full h-[75%] flex items-center justify-center'>
      {hambursyLoader}
    </div>
  )

  return (<div>
    {product && Object.keys(product) !== 0 &&
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