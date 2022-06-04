import React,{useState,useEffect} from 'react'
import { connect, useSelector } from 'react-redux';
import { addToCart } from '../actions/cart-actions';
import { useLocation, useNavigate } from 'react-router-dom';
import AddIcon from '../images/addIcon.svg'
import MinusIcon from '../images/minusIcon.svg'
import appApi from '../api/appApi';
import * as routes from '../api/apiRoutes'

const ProductDetail = ({addToCart}) => {
    const [quantity,setQuantity] = useState(1);
    const { currentUser} = useSelector(state => state.user)
    
    //Retrieve product from ProductThumb (Link)
    const location= useLocation();
    const product= location.state;
    
    useEffect(() => {
        window.scrollTo(0,0);
    },[])


    const handleIncrease = () => {
        setQuantity(+quantity+1)
    }
    const handleDecrease = () => {
        if (quantity>1)
            setQuantity(+quantity-1)
    }

    const handleAddToCart = async () => {
        try {
          const token = await currentUser.getIdToken()
    
          await appApi.post(
            routes.ADD_ITEM_TO_CART,
            routes.getAddCartBody(
              product.id,
              quantity
            ),
            routes.getAccessTokenHeader(token)
          )
          addToCart(+quantity)
        } catch (err) {
          console.log(err)
        }
      }

    return (
        <div className='grid grid-cols-2 pt-14 px-32 gap-10 justify-between'>
            {/* Product Image */}
            <div className='bg-gray-thumb rounded-lg w-[750px] h-[500px] grid place-content-center'>
                <img src={product.itemImage} alt='Product Thumbnail' className='h-[500px] object-contain self-center' />
            </div>
            {/* Product Detail */}
            <div className='grid place-self-end h-full grid-rows-2 w-[600px]'>
                {/* Product Title */}
                <h2 className='font-extrabold text-5xl place-self-start'>{product.itemName.toUpperCase()}</h2>
                <div className='grid'>
                    {/* Calories */}
                    <h4 className='text-22 border-b-[1px] border-divider'>
                        {'calories: '+product.calories}
                    </h4>
                    {/* Quantity */}
                    <div className='grid grid-cols-2 justify-between items-center'>
                        <h3 className='font-semibold text-22'>QUANTITY</h3>
                        <div className='grid grid-cols-3 place-items-end'>
                            <button onClick={handleDecrease}>
                                <img src={MinusIcon} alt="Minus" className='w-10 '/>
                            </button>
                            <input className=' w-10 h-10 placeholder-black-placeholder
                            border-gray-border font-semibold text-22 text-center outline-0 border-[1px] rounded-md' 
                            value={quantity}
                            onChange={e => {!isNaN(e.target.value)&&setQuantity(e.target.value)}}
                            />
                            <button onClick={handleIncrease}>
                                <img src={AddIcon} alt="Add" className='w-10'/>
                            </button>
                        </div>
                    </div>
                </div>
                {/* Add to Cart Button */}
                <button onClick={handleAddToCart} className='hidden md:flex items-center justify-center bg-secondary text-5xl text-white font-medium rounded-[50px] w-50 h-20 px-10'>
                    Add to Cart
                </button>
            </div>
        </div>
        
    )
}

const mapDispatchToProps = dispatch => {
    return {
        addToCart: (quantity) => dispatch(addToCart(quantity))
    }
}

export default connect(null,mapDispatchToProps)(ProductDetail)