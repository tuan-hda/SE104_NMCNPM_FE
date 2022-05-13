import React from 'react'

const CartProductThumbnail = ({itemData}) => {

    return (
        <div className='flex h-24 col-span-3 place-self-start gap-3'>
            {/* Product Image */}
            <div className='bg-gray-thumb rounded-lg w-[120px] h-[100px] grid place-content-center'>
                <img src={itemData.image} alt='Product Thumbnail' className='h-[100px] object-contain self-center' />
            </div>
            {/* Product Info */}
            <div className='grid place-self-end h-full grid-rows-3 text-15 place-content-center col-span-2'>
                <h6 className='font-semibold'>{itemData.title}</h6>
                <h6>{'Calories: '+itemData.calories}</h6>
                <h6 className='text-primary font-semibold places'>{'$'+itemData.price}</h6>
            </div>
        </div>
    )
}

export default CartProductThumbnail