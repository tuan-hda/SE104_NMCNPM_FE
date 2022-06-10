import React, { useEffect, useState } from 'react'
import AddressBookModal from '../components/modals/AddressBookModal'
import OrderSuccessModal from '../components/modals/OrderSuccessModal'
import PaymentMethodRadioButton from '../components/PaymentMethodRadioButton'
import useModal from '../utils/useModal'
import { validateDeliveryInfo } from '../utils/validateInfo'
import * as routes from '../api/apiRoutes'
import { useSelector } from 'react-redux'
import appApi from '../api/appApi'
import PurchaseItemList from '../components/PurchaseItemList'
import axios from 'axios'
import provinceApi from '../api/provinceApi'
import sortByName from '../utils/sortByName'
import normalizeText from '../utils/normalizeText'
import handleApiCallError from '../utils/handleApiCallError'
import AlertModal from '../components/modals/AlertModal'
import LoadingScreen from '../components/LoadingScreen'

// Create data for combobox
const createComboboxData = data => {
  return data.map((d, i) => (
    <option key={i} value={d.code + '_' + d.name}>
      {d.name}
    </option>
  ))
}

const nominatimApi = axios.create({
  baseURL: 'https://nominatim.openstreetmap.org/'
})

const getProvinceName = province =>
  province.substring(province.indexOf('_') + 1)

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
  const [loading, setLoading] = useState(false)

  // ABM (Address Book Modal) is true by default, otherwise AAM (Add Address Modal) is true
  const [isABM, setIsABM] = useState(true)

  const [result, setResult] = useState()

  const { isShowing, toggle } = useModal()
  const { isShowing: isSuccessShowing, toggle: toggleSuccessShowing } =
    useModal()
  const { isShowing: distanceError, toggle: toggleDistanceError } = useModal()
  const { currentUser } = useSelector(state => state.user)
  const { qty } = useSelector(state => state.cart)

  // Fetch province at first render
  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await provinceApi.get('/p')
        //dispatch(setProvince(response.data))
        setProvince(sortByName(normalizeText(response.data)))
      } catch (err) {
        handleApiCallError(err)
      }
    }

    fetchProvinces()
  }, [])

  // Fetch district after selected province
  const fetchDistricts = async province => {
    try {
      const str = String(province)
      const code = str.substring(0, str.indexOf('_'))
      const response = await provinceApi.get(`p/${code}`, {
        params: {
          depth: 2
        }
      })
      setDistrictSelected(false)
      setWardSelected(false)
      setDistrict(sortByName(normalizeText(response.data.districts)))
      setWard([])
    } catch (err) {
      handleApiCallError(err)
    }
  }

  // Fetch wards after selected district
  const fetchWards = async district => {
    try {
      const str = String(district)
      const code = str.substring(0, str.indexOf('_'))
      const response = await provinceApi.get(`d/${code}`, {
        params: {
          depth: 2
        }
      })

      //console.log(2);
      setWardSelected(false)
      setWard(sortByName(normalizeText(response.data.wards)))
    } catch (err) {
      handleApiCallError(err)
    }
  }

  const handleChange = e => {
    const key = e.target.name
    const value = e.target.value

    // Realtime validation
    const err = validateDeliveryInfo({
      [key]: value
    })

    setError(previousState => ({
      ...previousState,
      [key]: err[key]
    }))

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
      fetchDistricts(value)
      return
    }

    if (key === 'district' && value !== 'default') {
      setDistrictSelected(true)
      setDeliveryInfo({
        ...deliveryInfo,
        district: value,
        ward: ''
      })
      fetchWards(value)
      return
    }

    if (key === 'ward' && value !== 'ward') {
      setWardSelected(true)
    }

    setDeliveryInfo({
      ...deliveryInfo,
      [key]: value
    })
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
        const temp = error
        Object.keys(temp).forEach(value => {
          if (value !== 'email') {
            temp[value] = ''
          }
        })
      }
    }
  }, [isShowing])

  const setAddress = async result => {
    setProvinceSelected(true)
    setDeliveryInfo(prev => ({
      ...prev,
      province: result.province
    }))

    await fetchDistricts(result.province)
    setDeliveryInfo(prev => ({
      ...prev,
      district: result.district
    }))
    setDistrictSelected(true)

    await fetchWards(result.district)
    setDeliveryInfo(prev => ({
      ...prev,
      ward: result.ward
    }))
    setWardSelected(true)
  }

  // useEffect(() => {
  //   console.log(deliveryInfo.province, deliveryInfo.district, deliveryInfo.ward)
  // }, [deliveryInfo.province, deliveryInfo.district, deliveryInfo.ward])

  useEffect(() => {
    if (result) {
      setDeliveryInfo(deliveryInfo => ({
        ...deliveryInfo,
        name: result.name,
        phone: result.phone,
        address: result.address
      }))
      setAddress(result)
    }
  }, [result])

  const handleCheckout = e => {
    e.preventDefault()

    const err = validateDeliveryInfo(deliveryInfo)
    setError(err)

    // If validation return false then break the function
    if (Object.keys(err).length !== 0 || qty === 0) {
      return
    }

    checkout()
  }

  const getPaymentMethodValue = method => {
    if (method === 'COD') return '0'
    else return '1'
  }

  const sendCheckout = (token, restaurantID) => {
    console.log(
      routes.getPurchaseBody(
        getPaymentMethodValue(currMethod),
        deliveryInfo.phone,
        deliveryInfo.address,
        deliveryInfo.province,
        deliveryInfo.district,
        deliveryInfo.ward,
        deliveryInfo.note,
        restaurantID
      )
    )
    return appApi.put(
      routes.PURCHASE,
      routes.getPurchaseBody(
        getPaymentMethodValue(currMethod),
        deliveryInfo.phone,
        deliveryInfo.address,
        deliveryInfo.province,
        deliveryInfo.district,
        deliveryInfo.ward,
        deliveryInfo.note,
        restaurantID
      ),
      routes.getAccessTokenHeader(token)
    )
  }

  const getCoordinates = () => {
    const q =
      getProvinceName(deliveryInfo.province) +
      ', ' +
      getProvinceName(deliveryInfo.district) +
      ', ' +
      getProvinceName(deliveryInfo.ward)
    return nominatimApi.get('search.php?format=jsonv2&q=' + q)
  }

  const showDistanceError = () => {
    console.log('Error distance too far')
    toggleDistanceError()
  }

  const fetchRestaurants = async () => {
    try {
      const result = await appApi.get(routes.GET_RESTAURANT)
      return result.data.restaurants
    } catch (err) {
      if (err.response) {
        console.log(err.response.data)
        console.log(err.response.status)
        console.log(err.response.headers)
      } else {
        console.log(err.message)
      }
      return []
    }
  }

  const degreesToRadians = degrees => {
    return (degrees * Math.PI) / 180
  }

  const distanceBetween2Coors = (coor1, coor2) => {
    const earthRadiusKm = 6371

    const dLat = degreesToRadians(coor1.latitude - coor2.latitude)
    const dLon = degreesToRadians(coor1.longitude - coor2.longitude)

    const lat1 = degreesToRadians(coor1.latitude)
    const lat2 = degreesToRadians(coor2.latitude)

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return earthRadiusKm * c
  }

  const checkout = async () => {
    setLoading(true)
    try {
      const token = await currentUser.getIdToken()

      // Get current Coordinates of user's address
      const result = await getCoordinates()
      if (result.data.length === 0) {
        showDistanceError()
        return
      }
      const coordinates = {
        latitude: result.data[0].lat,
        longitude: result.data[0].lon
      }

      const fetchedRestaurants = await fetchRestaurants()
      // Sort restaurants by distance
      const calculatedRestaurants = fetchedRestaurants.map((res, index) => {
        return {
          ...res,
          key: index,
          distance: distanceBetween2Coors(res, coordinates)
        }
      })
      // console.log(calculatedRestaurants)

      const sortedRestaurants = calculatedRestaurants.sort((a, b) => {
        return a.distance - b.distance
      })

      const nearestRestaurant = sortedRestaurants[0]

      // If the distance is too far then show error
      if (nearestRestaurant.distance > 5) {
        showDistanceError()
        return
      }
      console.log(nearestRestaurant)

      // console.log(nearestRestaurant.id)
      // return
      await sendCheckout(token, nearestRestaurant.id)

      // Save address if user choose this option
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
      toggleSuccessShowing()
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='w-full h-full' onSubmit={e => e.preventDefault()}>
      <LoadingScreen loading={loading} />
      <AlertModal
        isShowing={distanceError}
        msg="Your location is too far. Sorry that we can't confirm your order."
        hide={toggleDistanceError}
        disableCancel={true}
      />
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
        info={info}
      />

      <form className='px-2 sm:px-8 md:px-16 xl:px-32 flex md:flex-row flex-col-reverse justify-between gap-8'>
        {/* Small devices purchase button. This button is put at the top of the page because we're using flex-col-reverse here on small devices */}
        <button
          className={`${
            qty
              ? 'bg-primary text-white hover:bg-opacity-90 '
              : 'bg-gray-200 text-gray-500'
          } md:hidden text-13  text-white h-12 font-semibold w-full mt-5 rounded-lg hover:bg-opacity-90 transition duration-300'`}
          type='submit'
          disabled={!qty}
          onClick={handleCheckout}
        >
          Purchase
          <br />
          <p className='font-normal mt-1'>
            {'$' +
              ((info.subtotal || 0) +
                (info.deliveryFee || 0) -
                (info.discount || 0))}
          </p>
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
                    {createComboboxData(province || [])}
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
                    {createComboboxData(district || [])}
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
                    {createComboboxData(ward || [])}
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
            className={`${
              qty
                ? 'bg-primary text-white hover:bg-opacity-90 '
                : 'bg-gray-200 text-gray-500'
            } hidden md:block  h-12 font-semibold w-full mt-5 rounded-lg transition duration-300`}
            type='submit'
            disabled={!qty}
            onClick={handleCheckout}
          >
            Purchase
          </button>
        </div>
      </form>
    </div>
  )
}

export default Purchase
