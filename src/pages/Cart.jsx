import React,{useState,useEffect} from 'react'
import { connect } from 'react-redux'
import CartItemList from '../components/CartItemList'

const Cart = ({cart}) => {

    const [subTotal, setSubTotal] = useState(0)
    useEffect(() => {
        let price=0;

        for (let i = 0; i < cart.length; i++) {
            price += cart[i].qty * cart[i].price;
        }

        setSubTotal(price);
    },[cart,subTotal,setSubTotal])

    return (
        <div className='py-10 px-32 w-full h-full flex justify-between gap-32'>
            {/* Left section */}
            <div>
                {/* page Title */}
                <h1 className='text-34 font-extrabold'>Cart</h1>
                <div className='mt-8'>
                    {/* Item list */}
                    <CartItemList cart={cart} prop='w-[800px]' isEditable={true}/>
                </div>
            </div>
        
            {/* Right section */}
            {/* Order Summary */}
            <div className=' bg-[#F5F5F6] flex-grow h-full place-self-end rounded-xl'>
                <div className=' px-11 py-11'>
                    {/* Title */}
                        <h2 className=' font-semibold text-[24px] mb-10 h-16 border-b-[1px] border-[#C6BDBD]'>ORDER SUMMARY</h2>                    
                    {/* Subtotal */}
                    <div className='w-full grid grid-cols-2 justify-between mb-10'>
                        <h3>SUBTOTAL</h3>
                        <h3 className='place-self-end font-medium'>
                        {'$'+subTotal}
                        </h3>
                    </div>
                    {/* TAX */}
                    <div className='w-full grid grid-cols-2 justify-between mb-24'>
                        <h3>TAX</h3>
                        <h3 className='place-self-end font-medium'>-</h3>
                    </div>
                    {/* ESTIMATED TOTAL */}
                    <div className='w-full grid grid-cols-2 justify-between place-content-center h-24 border-t-[1px] border-[#C6BDBD]'>
                        <h3 className='font-semibold'>ESTIMATED TOTAL</h3>
                        <h3 className='font-semibold text-secondary place-self-end'>
                        {'$'+subTotal}
                        </h3>
                    </div>
                    {/* Add to Cart Button */}
                    <button className='hidden md:flex items-center justify-center bg-secondary text-22 text-white font-semibold rounded-[15px] w-full h-14 px-10'>
                        CHECKOUT
                    </button>
                </div>
            </div>
            
        </div>
    )
}

const mapStateToProps = state => {
    return {
        cart: state.cart.cartItems
    }
}

export default connect(mapStateToProps)(Cart)