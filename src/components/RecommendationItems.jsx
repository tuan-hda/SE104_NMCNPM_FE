import React, { useEffect, useState }  from 'react'
import ProductThumb from './ProductThumb'
import api from '../api/appApi'
import * as routes from '../api/apiRoutes'
import { hambursyLoader } from './LoadingScreen';

const RecommendationItems = () => {
  const [loading, setLoading] = useState(true)
  const [productData, setProduct] = useState({})

  let result
  const fetchMenu = async () => {
    try {
      result = await api.get(routes.GET_FEATURED_ITEM)

      setProduct(result.data.items)
    }
    catch (err) {
      if (err.response) {
        console.log(err.response.data)
        console.log(err.response.status)
        console.log(err.response.headers)
      } 
      else {
        console.log(err.message)
      }
    } 
    finally {
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
  
  console.log(productData)

  return (
    <div
    className="w-full overflow-x-scroll mb-8"
    >
        {/* Scroll Items */}
        <div
        className="w-max flex gap-x-16 mb-14"
        >
          
            {/* Product Thumbs */}
            {Object.keys(productData) !== 0 && 
              productData.map((p, i) => {
                return <ProductThumb key={i} product={p} />
              })
            }
          
      </div>
    </div>
  )
}

export default RecommendationItems