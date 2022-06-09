import React, { useEffect, useState } from 'react'
import appApi from '../../api/appApi'
import { validateAddAddress } from '../../utils/validateInfo'
import * as routes from '../../api/apiRoutes'
import { useSelector } from 'react-redux'
import provinceApi from '../../api/provinceApi'
import sortByName from '../../utils/sortByName'
import normalizeText from '../../utils/normalizeText'
import handleApiCallError from '../../utils/handleApiCallError'

// Create data for combobox
const createComboboxData = data => {
  return data.map((d, i) => (
    <option key={i} value={d.code + '_' + d.name}>
      {d.name}
    </option>
  ))
}

const crossIcon = (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    version='1.1'
    id='Capa_1'
    x='0px'
    y='0px'
    viewBox='0 0 512.021 512.021'
    className='w-4 h-4 '
  >
    <g>
      <path d='M301.258,256.01L502.645,54.645c12.501-12.501,12.501-32.769,0-45.269c-12.501-12.501-32.769-12.501-45.269,0l0,0   L256.01,210.762L54.645,9.376c-12.501-12.501-32.769-12.501-45.269,0s-12.501,32.769,0,45.269L210.762,256.01L9.376,457.376   c-12.501,12.501-12.501,32.769,0,45.269s32.769,12.501,45.269,0L256.01,301.258l201.365,201.387   c12.501,12.501,32.769,12.501,45.269,0c12.501-12.501,12.501-32.769,0-45.269L301.258,256.01z' />
    </g>
  </svg>
)

const AddAddressModal = ({
  hide,
  isShowing,
  setIsABM,
  hideParent,
  currEditAddress,
  setCurrEditAddress,
  updateParentData
}) => {
  const [address, setAddress] = useState({
    name: '',
    phone: '',
    address: '',
    province: '',
    district: '',
    ward: ''
  })

  const [title, setTitle] = useState('ADD ADDRESS')

  const [province, setProvince] = useState([])
  const [ward, setWard] = useState([])
  const [district, setDistrict] = useState([])
  const [isDistrictSelected, setDistrictSelected] = useState(false)
  const [isWardSelected, setWardSelected] = useState(false)
  const [error, setError] = useState({})

  const { currentUser } = useSelector(state => state.user)

  // Fetch province at first render\
  const fetchProvinces = async () => {
    try {
      const response = await provinceApi.get('/p')
      //dispatch(setProvince(response.data))
      setProvince(sortByName(normalizeText(response.data)))
    } catch (err) {
      handleApiCallError(err)
    }
  }

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

  const setCurrAddress = async result => {
    setAddress(prev => ({
      ...prev,
      province: result.province
    }))

    await fetchDistricts(result.province)
    setAddress(prev => ({
      ...prev,
      district: result.district
    }))
    setDistrictSelected(true)

    await fetchWards(result.district)
    setAddress(prev => ({
      ...prev,
      ward: result.ward
    }))
    setWardSelected(true)
  }

  useEffect(() => {
    fetchProvinces()
    // If currEditAddress is not null, that means this modal is opened in edit mode
    if (currEditAddress) {
      setAddress({
        name: currEditAddress.name,
        phone: currEditAddress.phone,
        address: currEditAddress.address
      })
      setCurrAddress(currEditAddress)
      setTitle('EDIT ADDRESS')
      return
    }

    setAddress({
      name: '',
      phone: '',
      address: '',
      province: '',
      district: '',
      ward: ''
    })
  }, [])

  // Change address data if district or ward is not selected
  useEffect(() => {
    if (!isDistrictSelected) {
      setAddress(address => ({
        ...address,
        district: ''
      }))
    }
  }, [isDistrictSelected, currEditAddress])

  useEffect(() => {
    if (!isWardSelected)
      setAddress(address => ({
        ...address,
        ward: ''
      }))
  }, [isWardSelected])

  const handleChange = e => {
    const key = e.target.name
    const value = e.target.value

    if (key === 'province' && value !== 'default') {
      setAddress({
        ...address,
        province: value,
        district: '',
        ward: ''
      })
      fetchDistricts(value)
      return
    }

    if (key === 'district' && value !== 'default') {
      setDistrictSelected(true)
      setAddress({
        ...address,
        district: value,
        ward: ''
      })
      fetchWards(value)
      return
    }

    if (key === 'ward' && value !== 'ward') {
      setWardSelected(true)
    }

    if (e.target.name === 'phone') {
      setAddress({
        ...address,
        phone: e.target.value.replace(/\D/g, '')
      })
      return
    }

    setAddress({
      ...address,
      [e.target.name]: e.target.value
    })
  }

  const handleSave = () => {
    const err = validateAddAddress(address)
    setError(err)
    if (err && Object.keys(err).length !== 0) return
    setCurrEditAddress() // reset current edit address
    setIsABM(true)

    handleModifyAddress()
  }

  const handleModifyAddress = () => {
    if (currEditAddress) {
      updateAddress()
    } else {
      addAddress()
    }
  }

  // Update address
  const updateAddress = async () => {
    try {
      const token = await currentUser.getIdToken()

      await appApi.put(
        routes.UPDATE_ADDRESS,
        routes.getAddAddressBody(
          address.address,
          address.province,
          address.district,
          address.ward,
          address.name,
          address.phone
        ),
        {
          ...routes.getAccessTokenHeader(token),
          ...routes.getUpdateAddressIdParams(currEditAddress.id)
        }
      )

      updateParentData()
    } catch (err) {
      console.log(err)
    } finally {
      hide()
    }
  }

  // Add address to database
  const addAddress = async () => {
    try {
      const token = await currentUser.getIdToken()

      await appApi.post(
        routes.ADD_ADDRESS,
        routes.getAddAddressBody(
          address.address,
          address.province,
          address.district,
          address.ward,
          address.name,
          address.phone
        ),
        routes.getAccessTokenHeader(token)
      )

      updateParentData()
    } catch (err) {
      console.log(err)
    } finally {
      hide()
    }
  }

  const handleEscapeByClickOutside = () => {
    hide()
    setCurrEditAddress()
    setTimeout(() => {
      hideParent()
    }, 500)
  }

  const handleCancel = () => {
    setIsABM(true)
    setCurrEditAddress()
    hide()
  }

  return (
    <div
      className={`${
        isShowing ? 'opacity-100' : 'opacity-0 pointer-events-none'
      } address-modal-layer `}
      onClick={() => {
        handleEscapeByClickOutside()
      }}
    >
      <div className='address-modal' onClick={e => e.stopPropagation()}>
        {/* Close button */}
        <div
          className='absolute top-7 right-7 hover:bg-gray-border transition duration-300 rounded-full cursor-pointer w-8 h-8 flex items-center justify-center'
          onClick={() => handleCancel()}
        >
          {crossIcon}
        </div>

        {/* Title */}
        <h1 className='font-extrabold text-[26px] text-center mb-4'>{title}</h1>

        {/* Name + Phone */}
        <div className='flex sm:flex-row flex-col justify-between gap-4 mt-4 text-13'>
          <div className='flex-1'>
            <input
              className={`${
                error.name ? 'auth-input-err' : 'auth-input'
              } text-13 font-semibold`}
              placeholder='Name'
              name='name'
              value={address.name}
              onChange={handleChange}
            />
            <p className='text-red-500 ml-4 mt-1'>{error.name}</p>
          </div>
          <div className='flex-1'>
            <input
              className={`${
                error.phone ? 'auth-input-err' : 'auth-input'
              } text-13 font-semibold`}
              placeholder='Phone'
              name='phone'
              value={address.phone}
              onChange={handleChange}
            />
            <p className='text-red-500 ml-4 mt-1'>{error.phone}</p>
          </div>
        </div>

        {/* Address + Province */}
        <div className='flex sm:flex-row flex-col justify-between gap-4 mt-4 text-13'>
          <div className='flex-1'>
            <input
              className={`${
                error.address ? 'auth-input-err' : 'auth-input'
              } text-13 font-semibold`}
              placeholder='Address'
              name='address'
              value={address.address}
              onChange={handleChange}
            />
            <p className='text-red-500 ml-4 mt-1'>{error.address}</p>
          </div>
          <div className='flex-1'>
            <select
              className={`${
                error.province ? 'province-combobox-err' : 'province-combobox'
              } text-13 font-semibold ${
                address.province ? '' : 'text-black-placeholder'
              }`}
              name='province'
              value={address.province ? address.province : 'default'}
              onChange={handleChange}
            >
              <option value='default' disabled>
                Select province
              </option>
              {createComboboxData(province)}
            </select>
            <p className='text-red-500 ml-4 mt-1'>{error.province}</p>
          </div>
        </div>

        {/* District + Ward */}
        <div className='flex sm:flex-row flex-col justify-between gap-4 mt-4 text-13'>
          <div className='flex-1'>
            <select
              className={`${
                error.district ? 'province-combobox-err' : 'province-combobox'
              } text-13 font-semibold ${
                isDistrictSelected ? '' : 'text-black-placeholder'
              }`}
              name='district'
              value={isDistrictSelected ? address.district : 'default'}
              onChange={handleChange}
            >
              <option value='default' disabled>
                Select district
              </option>
              {createComboboxData(district)}
            </select>
            <p className='text-red-500 ml-4 mt-1'>{error.district}</p>
          </div>
          <div className='flex-1'>
            <select
              className={`${
                error.ward ? 'province-combobox-err' : 'province-combobox'
              } text-13 font-semibold ${
                isWardSelected ? '' : 'text-black-placeholder'
              }`}
              name='ward'
              value={isWardSelected ? address.ward : 'default'}
              onChange={handleChange}
            >
              <option value='default' disabled>
                Select ward
              </option>
              {createComboboxData(ward)}
            </select>
            <p className='text-red-500 ml-4 mt-1'>{error.ward}</p>
          </div>
        </div>

        {/* Button Cancel + Save */}
        <div className='flex justify-center mt-8 gap-2'>
          <button
            className='font-semibold bg-gray-button rounded-lg h-9 w-24 hover:bg-gray-500 hover:text-white transition duration-300 text-13'
            onClick={() => handleCancel()}
          >
            Cancel
          </button>
          <button
            className='font-semibold bg-primary rounded-lg h-9 w-24 text-white hover:bg-opacity-80 transition duration-300 text-13'
            onClick={() => handleSave()}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  )
}

export default AddAddressModal
