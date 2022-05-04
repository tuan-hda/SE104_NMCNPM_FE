import React, { useState } from 'react'

const Purchase = () => {
  const [deliveryInfo, setDeliveryInfo] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    province: '',
    district: '',
    ward: '',
    note: ''
  });

  const handleChange = e => {
    if (e.target.name === 'phone') {
      setDeliveryInfo({
        ...deliveryInfo,
        [e.target.name]: e.target.value.replace(/[^0-9]/, '')
      })
      return;
    }

    setDeliveryInfo({
      ...deliveryInfo,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className='pt-10 px-32 flex justify-between items-center'>

      <div className='w-3/5'>

        {/* Delivery information */}
        <div>
          {/* Title and Address book */}
          <div className='justify-between flex'>
            <h1 className='text-32 font-extrabold'>DELIVERY INFORMATION</h1>
            <button className='text-13 font-semibold hover:underline'>Address book</button>
          </div>

          {/* Information input */}
          <div className='mt-9 text-13'>
            {/* Name */}
            <input className='delivery-input font-semibold' type='text' placeholder='Name' name='name' value={deliveryInfo.name} onChange={handleChange} />

            {/* Phone */}
            <input className='mt-4 delivery-input font-semibold' type='text' placeholder='Phone' name='phone' value={deliveryInfo.phone} onChange={handleChange} />

            {/* Email */}
            <input className='mt-4 delivery-input font-semibold' type='email' placeholder='Email' name='email' value={deliveryInfo.email} onChange={handleChange} />

            {/* Address */}
            <input className='mt-4 delivery-input font-semibold' type='text' placeholder='Address' name='address' value={deliveryInfo.address} onChange={handleChange} />

            <div className='flex justify-between gap-2'>
              {/* Province */}
              <select className='mt-4 delivery-input font-semibold' type='text' placeholder='Province' name='province' value={deliveryInfo.province || 'default'} onChange={handleChange} >
                <option value='default' disabled>Choose province</option>
              </select>

              {/* District */}
              <select className='mt-4 delivery-input font-semibold' type='text' placeholder='District' name='district' value={deliveryInfo.district || 'default'} onChange={handleChange} >
                <option value='default' disabled>Choose district</option>
              </select>

              {/* Ward */}
              <select className='mt-4 delivery-input font-semibold' type='text' placeholder='Ward' name='ward' value={deliveryInfo.ward || 'default'} onChange={handleChange}>
                <option value='default' disabled>Choose ward</option></select>
            </div>

            {/* Note */}
            <input className='mt-4 delivery-input font-semibold' type='text' placeholder='Note (optional)' name='note' value={deliveryInfo.note} onChange={handleChange} />
          </div>

          {/* Save address in address book checkbox */}
          <div className='mt-4 flex items-center font-semibold text-13'>
            <input type='checkbox' className='h-4 w-4 accent-primary' id='save-address' />
            <label className='ml-4' htmlFor='save-address'>Save address in Address book</label>
          </div>

        </div>

        {/* */}
      </div>

    </div>
  )
}

export default Purchase