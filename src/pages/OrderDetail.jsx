import React from 'react'
import { useLocation } from 'react-router-dom'
import CartItemList from '../components/CartItemList'
import status_payed from '../images/order_status/payed.png'
import arrowIcon from '../images/back-arrow.svg'

const OrderDetail = () => {
    
    //Get orderID from profile/orders
    const {state} = useLocation();

    //Get order Information by orderID from database
    //Sample data
    const orderData = {
        orderID: '123456',
        name: 'Nguyen Van A',
        phoneNumber: '0123456789',
        address: '150 Elgin Street, Floor 8, Ottawa ON K2P 1L4, Canada',
        purchaseDate: '12/04/2022',
        subTotal: 143.96,
        ship: 3,
        total: 146.96,
        status: 2,
        payment: 0,
        cart: [
            {
            id:1,
            image: 'https://digitaleat.kfc.com/menus/image/bare/kfc-sidesloverstendersmeal?q=75&w=1280',
            title: 'Hamburgers And Chips Meal',
            calories: 6750,
            category: 'Featured',
            price: 59.99,
            qty: 2
            },
            {
            id:2,
            image: 'https://digitaleat.kfc.com/menus/image/bare/kfc-sidesloverstendersmeal?q=75&w=1280',
            title: 'Hamburgers And Chips Meal',
            calories: 6750,
            category: 'Combos',
            price: 59.99,
            qty: 1
            },
            {
            id:3,
            image: 'https://digitaleat.kfc.com/menus/image/bare/kfc-sidesloverstendersmeal?q=75&w=1280',
            title: 'Hamburgers And Chips Meal',
            calories: 6750,
            category: 'Hamburgers',
            price: 59.99,
            qty: 3
            }
        ]
    }
    
    return (
        <div className="px-32 py-28">
            {/* Title */}
            <h1 className="text-34 font-extrabold">Order Detail</h1>
            <div className="flex gap-16">
                {/* Left section */}
                <div className=" w-2/3">
                    {/* Delivery Information */}
                    <div className="w-full mt-10 border-2 border-[#CFCFCF] rounded-xl mb-10">
                        <div className="flex justify-between items-start p-2 gap-x-4">
                            {/* Order detail */}
                            <div className="flex flex-col space-y-1">
                                <h2>
                                Order #<span className="font-semibold">{state}</span>
                                </h2>
                                <h2>{"Purchase date: " + orderData.purchaseDate}</h2>
                                <button className="bg-primary w-36 h-6 rounded-sm text-13 text-white font-semibold">
                                Finished
                                </button>
                            </div>
                            {/* Delivery Address */}
                            <div>
                                <h3 className="font-semibold">Delivery Address</h3>
                                <h6>{orderData.name}</h6>
                                <h6>{"Phone number: " + orderData.phoneNumber}</h6>
                                <h6>{orderData.address}</h6>
                            </div>
                            {/* Payment Method */}
                            <div>
                                <h3 className="font-semibold">Payment method</h3>
                                <h6>Cash on Delivery (COD)</h6>
                            </div>
                        </div>
                    </div>
                    {/* Item list */}
                    <CartItemList cart={orderData.cart} prop='' isEditable={false} />
                </div>
                {/* Right section */}
                <div className="flex-grow">
                {/* Bill */}
                <div className="border-[1px] border-[#CFCFCF] rounded-2xl h-fit mt-10">
                    <div className="flex items-center gap-3 p-5">
                    <img src={status_payed} alt="Payed" className=" w-16" />
                    <h2 className="font-semibold text-22">Paid</h2>
                    </div>
                    {/* Divider */}
                    <div className="border-t-[1px] border-[#CFCFCF] flex-grow" />
                    {/* Total */}
                    <div className="p-5">
                    {/* Subtotal */}
                    <div className="flex justify-between py-4">
                        <h5>Subtotal</h5>
                        <h5>{"$" + orderData.subTotal}</h5>
                    </div>
                    {/* Tax */}
                    <div className="flex justify-between py-4">
                        <h5>Tax</h5>
                        <h5>-</h5>
                    </div>
                    {/* Estimated total */}
                    <div className="flex justify-between py-4">
                        <h5>Estimated total</h5>
                        <h5>{"$" + orderData.subTotal}</h5>
                    </div>
                    {/* Delivery fee */}
                    <div className="flex justify-between py-4">
                        <h5>Delivery fee</h5>
                        <h5>{"$" + orderData.ship}</h5>
                    </div>
                    {/* Total */}
                    <div className="flex justify-between py-4">
                        <h5 className="font-semibold">Total</h5>
                        <h5 className="font-semibold">{"$" + orderData.total}</h5>
                    </div>
                    </div>
                </div>

                {/* Back to Order History */}
                <div className="flex gap-2 items-center mt-5 justify-end">
                    <img src={arrowIcon} alt="Back to Order History" />
                    <h5 className="font-medium text-primary">Order History</h5>
                </div>
                </div>
            </div>
      </div>
    );
}

export default OrderDetail