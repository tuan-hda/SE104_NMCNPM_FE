import React, { useEffect, useState }  from 'react'
import ProductThumb from './ProductThumb'
import api from '../api/appApi'
import * as routes from '../api/apiRoutes'
import { hambursyLoader } from './LoadingScreen';

const FavoriteItems = () => {
    
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
      <div className='flex w-max'>
        {/* TRY ONE OF THESE FAVORITES */}
        <div className='ml-10 mr-8 w-96'>
          <h2 className='text-[55px] text-[#5E5E64] font-extrabold mt-32'>TRY ONE OF THESE FAVORITES</h2>
        </div>
        {/* Scroll Items */}
        <div
        className="flex gap-x-10 mb-20"
        >  
          {/* Product Thumbs */}
          {Object.keys(productData) !== 0 && productData.map((p, i) => {
              return <ProductThumb key={i} product={p} />
            })
          }
        </div>
      </div>
    </div>
  )
}

export default FavoriteItems