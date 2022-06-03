import React,{useState,useEffect} from 'react'
import { connect, useSelector } from 'react-redux';
import { addToCart } from '../actions/cart-actions';
import { useLocation } from 'react-router-dom';
import AddIcon from '../images/addIcon.svg'
import MinusIcon from '../images/minusIcon.svg'
import api from '../api/appApi'
import * as routes from '../api/apiRoutes'

const ProductDetail = ({addToCart}) => {
    const [quantity,setQuantity] = useState(1);
    const { currentUser, loading, error } = useSelector(state => state.user)
    
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

    // const addToCart = async (photoUrl) => {
    //     try {
    //         const token = await currentUser.getIdToken()

    //         await api.post(
    //           routes.ADD_ITEM_TO_CART,
    //           routes.getAddCartBody(product.name, currentUser.name),
    //           routes.getSignupHeader(token)
    //         )
    //     } catch (err) {
    //       if (err.response) {
    //         console.log(err.response.data)
    //         console.log(err.response.headers)
    //         console.log(err.response.status)
    //       } else {
    //         console.log(err.message)
    //       }
    //     } finally {
    //       setLoading(false)
    //     }
    //   }

    return (
        <div className='grid grid-cols-2 pt-48 px-32 gap-10 justify-between'>
            {/* Product Image */}
            <div className='bg-gray-thumb rounded-lg w-[750px] h-[500px] grid place-content-center'>
                <img src={product.image} alt='Product Thumbnail' className='h-[500px] object-contain self-center' />
            </div>
            {/* Product Detail */}
            <div className='grid place-self-end h-full grid-rows-2 w-[600px]'>
                {/* Product Title */}
                <h2 className='font-extrabold text-5xl place-self-start'>{product.title.toUpperCase()}</h2>
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
                <button onClick={() => addToCart({product,quantity})} className='hidden md:flex items-center justify-center bg-secondary text-5xl text-white font-medium rounded-[50px] w-50 h-20 px-10'>
                    Add to Cart
                </button>
            </div>
        </div>
        
    )
}

const mapDispatchToProps = dispatch => {
    return {
        addToCart: ({product,quantity}) => dispatch(addToCart({product,quantity}))
    }
}

export default connect(null,mapDispatchToProps)(ProductDetail)