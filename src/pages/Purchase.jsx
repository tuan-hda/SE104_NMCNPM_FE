import React, { useEffect, useState } from 'react'
import AddressBookModal from '../components/modals/AddressBookModal';
import PaymentMethodRadioButton from '../components/PaymentMethodRadioButton';
import ProvinceGetter from '../components/ProvinceGetter';
import useModal from '../utils/useModal'

// Create data for combobox
const createComboboxData = data => {
  return data.map((d, i) => <option key={i} value={d.code + '_' + d.name}>
    {d.name}
  </option>)
}

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
  const [saveAddress, setSaveAddress] = useState(false);
  const [currMethod, setMethod] = useState('COD');
  const [voucher, setVoucher] = useState('');

  const [province, setProvince] = useState([]);
  const [district, setDistrict] = useState([]);
  const [ward, setWard] = useState([]);
  const [isProvinceSelected, setProvinceSelected] = useState(false);
  const [isDistrictSelected, setDistrictSelected] = useState(false);
  const [isWardSelected, setWardSelected] = useState(false);

  // ABM (Address Book Modal) is true by default, otherwise AAM (Add Address Modal) is true
  const [isABM, setIsABM] = useState(true);

  const [result, setResult] = useState()

  const { isShowing, toggle } = useModal();

  ProvinceGetter({ province: deliveryInfo.province, district: deliveryInfo.district, setProvince, setDistrict, setWard, setWardSelected, setDistrictSelected, info: deliveryInfo, setInfo: setDeliveryInfo, result })

  const handleChange = e => {
    if (e.target.name === 'phone') {
      setDeliveryInfo({
        ...deliveryInfo,
        [e.target.name]: e.target.value.replace(/[^0-9]/, '')
      })
      return;
    }

    if (e.target.name === 'province' && e.target.value !== 'default') {
      setProvinceSelected(true);
    }

    if (e.target.name === 'district' && e.target.value !== 'default') {
      setDistrictSelected(true);
    }

    if (e.target.name === 'ward' && e.target.value !== 'ward') {
      setWardSelected(true);
    }

    setDeliveryInfo({
      ...deliveryInfo,
      [e.target.name]: e.target.value
    })
  }

  const showModal = () => {
    toggle();
  }

  useEffect(() => {
    if (!isShowing) {
      setIsABM(true)
      if (result) {
        setProvinceSelected(true)
        setDeliveryInfo(deliveryInfo => ({
          ...deliveryInfo,
          province: result.province
        }))
      }
    }
  }, [isShowing])

  return (<div className='w-full h-full'>
    <AddressBookModal isABM={isABM} setIsABM={setIsABM} ABM_isShowing={isShowing} hide={toggle} setResult={setResult} />
    <div className='pt-10 px-32 flex justify-between gap-8'>

      {/* Left section */}
      <div className='w-3/5'>

        {/* Delivery information */}
        <div>
          {/* Title and Address book */}
          <div className='justify-between flex'>
            <h1 className='text-32 font-extrabold'>DELIVERY INFORMATION</h1>
            <button className='text-13 font-semibold hover:underline'
              onClick={() => showModal()}>Address book</button>
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
              <select className={`mt-4 delivery-input font-semibold ${isProvinceSelected ? '' : 'text-black-placeholder'}`} type='text' placeholder='Province' name='province' value={deliveryInfo.province || 'default'} onChange={handleChange} >
                <option value='default' disabled>Choose province</option>
                {createComboboxData(province)}
              </select>

              {/* District */}
              <select className={`mt-4 delivery-input font-semibold ${isDistrictSelected ? '' : 'text-black-placeholder'}`} type='text' placeholder='District' name='district' value={isDistrictSelected ? deliveryInfo.district : 'default'} onChange={handleChange} >
                <option value='default' disabled>Choose district</option>
                {createComboboxData(district)}
              </select>

              {/* Ward */}
              <select className={`mt-4 delivery-input font-semibold ${isWardSelected ? '' : 'text-black-placeholder'}`} type='text' placeholder='Ward' name='ward' value={isWardSelected ? deliveryInfo.ward : 'default'} onChange={handleChange}>
                <option value='default' disabled>Choose ward</option>
                {createComboboxData(ward)}
              </select>

            </div>

            {/* Note */}
            <input className='mt-4 delivery-input font-semibold' type='text' placeholder='Note (optional)' name='note' value={deliveryInfo.note} onChange={handleChange} />
          </div>

          {/* Save address in address book checkbox */}
          <div className='mt-4 flex items-center font-semibold text-13'>
            <input type='checkbox' className='h-4 w-4 accent-primary' id='save-address' defaultChecked={saveAddress} onChange={() => setSaveAddress(!saveAddress)} />
            <label className='ml-4' htmlFor='save-address'>Save address in Address book</label>
          </div>

        </div>

        {/* Payment method */}
        <div className='mt-[76px] mb-8'>
          {/* Title */}
          <h1 className='text-32 font-extrabold'>PAYMENT METHOD</h1>


          <div className=' mt-9'>
            <PaymentMethodRadioButton currMethod={currMethod} setMethod={setMethod} />
          </div>
        </div>
      </div>

      {/* Vertical devider */}
      <div className='min-h-full mb-6 border-l-[1px] border-gray-border' />

      {/* Right section */}
      <div className='flex-grow text-13'>
        {/* Title: Cart */}
        <h1 className='text-32 font-extrabold mb-5'>CART</h1>

        {/* Voucher */}
        <input type='text' placeholder='Voucher' className='mt-4 delivery-input font-semibold' name='voucher' value={voucher} onChange={(e) => { setVoucher(e.target.value) }} />

        {/* Divider */}
        <div className='border-t-[1px] border-gray-border mt-4' />

        {/* Subtotal */}
        <div className='flex justify-between pt-4 font-semibold'>
          <p>Subtotal</p>
          <p>{'$' + 40}</p>
        </div>

        {/* Discount */}
        <div className='flex justify-between pt-4 font-semibold'>
          <p>Subtotal</p>
          <p>{'$' + 5.01}</p>
        </div>

        {/* Shipping fee */}
        <div className='flex justify-between pt-4 font-semibold'>
          <p>Subtotal</p>
          <p>{'$' + 1}</p>
        </div>

        {/* Divider */}
        <div className='border-t-[1px] border-gray-border mt-4' />

        {/* Total */}
        <div className='flex justify-between pt-4 font-semibold text-base'>
          <p>Subtotal</p>
          <p>{'$' + 40}</p>
        </div>

        {/* Purchase button */}
        <button className='bg-primary text-white h-12 font-semibold w-full mt-5 rounded-lg hover:bg-opacity-90 transition duration-300'>
          Purchase
        </button>
      </div>

    </div>
  </div>
  )
}

export default Purchase