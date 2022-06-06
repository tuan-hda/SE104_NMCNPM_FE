import React, { useEffect, useState } from 'react'
import AddressBookModal from '../components/modals/AddressBookModal'
import OrderSuccessModal from '../components/modals/OrderSuccessModal'
import PaymentMethodRadioButton from '../components/PaymentMethodRadioButton'
import ProvinceGetter from '../components/ProvinceGetter'
import useModal from '../utils/useModal'
import { validateDeliveryInfo } from '../utils/validateInfo'
import * as routes from '../api/apiRoutes'
import { useSelector } from 'react-redux'
import appApi from '../api/appApi'
import PurchaseItemList from '../components/PurchaseItemList'

// Create data for combobox
const createComboboxData = data => {
  return data.map((d, i) => (
    <option key={i} value={d.code + '_' + d.name}>
      {d.name}
    </option>
  ))
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
  })
  const [saveAddress, setSaveAddress] = useState(false)
  const [currMethod, setMethod] = useState('COD')

  const [province, setProvince] = useState([])
  const [district, setDistrict] = useState([])
  const [ward, setWard] = useState([])
  const [isProvinceSelected, setProvinceSelected] = useState(false)
  const [isDistrictSelected, setDistrictSelected] = useState(false)
  const [isWardSelected, setWardSelected] = useState(false)
  const [info, setInfo] = useState({})
  const [error, setError] = useState({})

  // ABM (Address Book Modal) is true by default, otherwise AAM (Add Address Modal) is true
  const [isABM, setIsABM] = useState(true)

  const [result, setResult] = useState()

  const { isShowing, toggle } = useModal()
  const { isShowing: isSuccessShowing, toggle: toggleSuccessShowing } =
    useModal()
  const { currentUser } = useSelector(state => state.user)

  ProvinceGetter({
    province: deliveryInfo.province,
    district: deliveryInfo.district,
    setProvince,
    setDistrict,
    setWard,
    setWardSelected,
    setDistrictSelected,
    info: deliveryInfo,
    setInfo: setDeliveryInfo,
    result
  })

  const handleChange = e => {
    const key = e.target.name
    const value = e.target.value

    if (key === 'phone') {
      if (value === '' || /^[0-9\b]+$/.test(value))
        setDeliveryInfo({
          ...deliveryInfo,
          [key]: value
        })
      return
    }

    if (key === 'province' && value !== 'default') {
      setProvinceSelected(true)
      setDeliveryInfo({
        ...deliveryInfo,
        province: value,
        district: '',
        ward: ''
      })
      return
    }

    if (key === 'district' && value !== 'default') {
      setDistrictSelected(true)
      setDeliveryInfo({
        ...deliveryInfo,
        district: value,
        ward: ''
      })
      return
    }

    if (key === 'ward' && value !== 'ward') {
      setWardSelected(true)
    }

    setDeliveryInfo({
      ...deliveryInfo,
      [key]: value
    })

    // Realtime validation
    const err = validateDeliveryInfo({
      [key]: value
    })

    setError(previousState => ({
      ...previousState,
      [key]: err[key]
    }))
  }

  const showModal = () => {
    toggle()
    setResult()
  }

  // After close modal, set address
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

  useEffect(() => {
    if (result) {
      setDeliveryInfo(deliveryInfo => ({
        ...deliveryInfo,
        name: result.name,
        phone: result.phone,
        address: result.address
      }))
    }
  }, [result])

  const handleCheckout = e => {
    e.preventDefault()

    const err = validateDeliveryInfo(deliveryInfo)
    setError(err)

    // If validation return false then break the function
    if (Object.keys(err).length !== 0) {
      return
    }

    checkout()
  }

  const checkout = async () => {
    try {
      const token = await currentUser.getIdToken()

      await appApi.put(
        routes.PURCHASE,
        routes.getPurchaseBody(
          currMethod,
          deliveryInfo.phone,
          deliveryInfo.address,
          deliveryInfo.province,
          deliveryInfo.district,
          deliveryInfo.ward,
          deliveryInfo.note
        ),
        routes.getAccessTokenHeader(token)
      )

      toggleSuccessShowing()
      if (saveAddress) {
        await appApi.post(
          routes.ADD_ADDRESS,
          routes.getAddAddressBody(
            deliveryInfo.address,
            deliveryInfo.province,
            deliveryInfo.district,
            deliveryInfo.ward,
            deliveryInfo.name,
            deliveryInfo.phone
          ),
          routes.getAccessTokenHeader(token)
        )
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className='w-full h-full' onSubmit={e => e.preventDefault()}>
      <AddressBookModal
        isABM={isABM}
        setIsABM={setIsABM}
        ABM_isShowing={isShowing}
        hide={toggle}
        setResult={setResult}
      />

      <OrderSuccessModal
        isShowing={isSuccessShowing}
        data={{ deliveryInfo, currMethod }}
      />

      <form className='px-2 sm:px-8 md:px-16 xl:px-32 flex md:flex-row flex-col-reverse justify-between gap-8'>
        {/* Small devices purchase button. This button is put at the top of the page because we're using flex-col-reverse here on small devices */}
        <button
          className='md:hidden text-13 bg-primary text-white h-12 font-semibold w-full mt-5 rounded-lg hover:bg-opacity-90 transition duration-300'
          type='submit'
          onClick={handleCheckout}
        >
          Check out
        </button>

        {/* Left section */}
        <div className='md:w-3/5'>
          {/* Delivery information */}
          <div>
            {/* Title and Address book */}
            <div className='justify-between flex'>
              <h1 className='text-32 font-extrabold'>DELIVERY INFORMATION</h1>
              <button
                className='text-13 font-semibold hover:underline text-right'
                onClick={() => {
                  showModal()
                }}
              >
                Address book
              </button>
            </div>

            {/* Information input */}
            <div className='mt-9 text-13'>
              {/* Name */}
              <input
                className={`${
                  error.name ? 'delivery-input-err' : 'delivery-input'
                } font-semibold`}
                type='text'
                placeholder='Name'
                name='name'
                value={deliveryInfo.name}
                onChange={handleChange}
              />
              <span className='ml-4 text-red-500'>{error.name}</span>

              {/* Phone */}
              <input
                className={`mt-4 ${
                  error.phone ? 'delivery-input-err' : 'delivery-input'
                } font-semibold`}
                type='text'
                placeholder='Phone'
                name='phone'
                value={deliveryInfo.phone}
                onChange={handleChange}
                maxLength={10}
              />
              <span className='ml-4 text-red-500'>{error.phone}</span>

              {/* Email */}
              <input
                className={`mt-4 ${
                  error.email ? 'delivery-input-err' : 'delivery-input'
                } font-semibold`}
                type='email'
                placeholder='Email'
                name='email'
                value={deliveryInfo.email}
                onChange={handleChange}
              />
              <span className='ml-4 text-red-500'>{error.email}</span>

              {/* Address */}
              <input
                className={`mt-4 ${
                  error.address ? 'delivery-input-err' : 'delivery-input'
                } font-semibold`}
                type='text'
                placeholder='Address'
                name='address'
                value={deliveryInfo.address}
                onChange={handleChange}
              />
              <span className='ml-4 text-red-500'>{error.address}</span>

              <div className='flex xl:flex-row flex-col justify-between gap-0 xl:gap-2'>
                {/* Province */}
                <div className='flex-1'>
                  <select
                    className={`mt-4 ${
                      error.province ? 'delivery-input-err' : 'delivery-input'
                    } font-semibold ${
                      isProvinceSelected ? '' : 'text-black-placeholder'
                    }`}
                    type='text'
                    placeholder='Province'
                    name='province'
                    value={deliveryInfo.province || 'default'}
                    onChange={handleChange}
                  >
                    <option value='default' disabled>
                      Choose province
                    </option>
                    {createComboboxData(province)}
                  </select>
                  <span className='ml-4 text-red-500'>{error.province}</span>
                </div>

                {/* District */}
                <div className='flex-1'>
                  <select
                    className={`mt-4 ${
                      error.district ? 'delivery-input-err' : 'delivery-input'
                    } font-semibold ${
                      isDistrictSelected ? '' : 'text-black-placeholder'
                    }`}
                    type='text'
                    placeholder='District'
                    name='district'
                    value={
                      isDistrictSelected ? deliveryInfo.district : 'default'
                    }
                    onChange={handleChange}
                  >
                    <option value='default' disabled>
                      Choose district
                    </option>
                    {createComboboxData(district)}
                  </select>
                  <span className='ml-4 text-red-500'>{error.district}</span>
                </div>

                {/* Ward */}
                <div className='flex-1'>
                  <select
                    className={`mt-4 ${
                      error.ward ? 'delivery-input-err' : 'delivery-input'
                    } font-semibold ${
                      isWardSelected ? '' : 'text-black-placeholder'
                    }`}
                    type='text'
                    placeholder='Ward'
                    name='ward'
                    value={isWardSelected ? deliveryInfo.ward : 'default'}
                    onChange={handleChange}
                  >
                    <option value='default' disabled>
                      Choose ward
                    </option>
                    {createComboboxData(ward)}
                  </select>
                  <span className='ml-4 text-red-500'>{error.ward}</span>
                </div>
              </div>

              {/* Note */}
              <input
                className={`mt-4 delivery-input font-semibold`}
                type='text'
                placeholder='Note (optional)'
                name='note'
                value={deliveryInfo.note}
                onChange={handleChange}
              />
            </div>

            {/* Save address in address book checkbox */}
            <div className='mt-4 flex items-center font-semibold text-13'>
              <input
                type='checkbox'
                className='h-4 w-4 accent-primary'
                id='save-address'
                defaultChecked={saveAddress}
                onChange={() => setSaveAddress(!saveAddress)}
              />
              <label className='ml-4' htmlFor='save-address'>
                Save address in Address book
              </label>
            </div>
          </div>

          {/* Payment method */}
          <div className='mt-[76px] mb-8'>
            {/* Title */}
            <h1 className='text-32 font-extrabold'>PAYMENT METHOD</h1>

            <div className=' mt-9'>
              <PaymentMethodRadioButton
                currMethod={currMethod}
                setMethod={setMethod}
              />
            </div>
          </div>
        </div>

        {/* Vertical devider */}
        <div className='min-h-full border-l-[1px] border-gray-border' />

        {/* Right section */}
        <div className='flex-grow text-13'>
          {/* Title: Cart */}
          <h1 className='text-32 font-extrabold mb-5'>CART</h1>

          {/* Purchase Item List */}
          <PurchaseItemList currentUser={currentUser} setInfo={setInfo} />

          {/* Divider */}
          <div className='border-t-[1px] border-gray-border mt-4' />

          {/* Subtotal */}
          <div className='flex justify-between pt-4 font-semibold'>
            <p>Subtotal</p>
            <p>{'$' + (info.subtotal || 0)}</p>
          </div>

          {/* Delivery fee */}
          <div className='flex justify-between pt-4 font-semibold'>
            <p>Delivery fee</p>
            <p>{'$' + (info.deliveryFee || 0)}</p>
          </div>

          {/* Discount */}
          <div className='flex justify-between pt-4 font-semibold'>
            <p>Discount</p>
            <p>{'$' + (info.discount || 0)}</p>
          </div>

          {/* Divider */}
          <div className='border-t-[1px] border-gray-border mt-4' />

          {/* Total */}
          <div className='flex justify-between pt-4 font-semibold text-lg text-primary'>
            <p>Total</p>
            <p>
              {'$' +
                ((info.subtotal || 0) +
                  (info.deliveryFee || 0) -
                  (info.discount || 0))}
            </p>
          </div>

          {/* Check out button */}
          <button
            className='bg-primary hidden md:block text-white h-12 font-semibold w-full mt-5 rounded-lg hover:bg-opacity-90 transition duration-300'
            type='submit'
            onClick={handleCheckout}
          >
            Check out
          </button>
        </div>
      </form>
    </div>
  )
}

export default Purchase
