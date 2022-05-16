import React, { useEffect, useState } from 'react'
import { validateAddAddress } from '../../utils/validateInfo';
import ProvinceGetter from '../ProvinceGetter';

// Create data for combobox
const createComboboxData = data => {
  return data.map((d, i) => <option key={i} value={d.code + '_' + d.name}>
    {d.name}
  </option>)
}

const crossIcon = <svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 512.021 512.021" className='w-4 h-4 ' >
  <g>
    <path d="M301.258,256.01L502.645,54.645c12.501-12.501,12.501-32.769,0-45.269c-12.501-12.501-32.769-12.501-45.269,0l0,0   L256.01,210.762L54.645,9.376c-12.501-12.501-32.769-12.501-45.269,0s-12.501,32.769,0,45.269L210.762,256.01L9.376,457.376   c-12.501,12.501-12.501,32.769,0,45.269s32.769,12.501,45.269,0L256.01,301.258l201.365,201.387   c12.501,12.501,32.769,12.501,45.269,0c12.501-12.501,12.501-32.769,0-45.269L301.258,256.01z" />
  </g>
</svg>

const AddAddressModal = ({ hide, isShowing, setIsABM, hideParent }) => {
  const [address, setAddress] = useState({
    name: '',
    phone: '',
    address: '',
    province: '',
    district: '',
    ward: '',
  });
  const [province, setProvince] = useState([]);
  const [ward, setWard] = useState([]);
  const [district, setDistrict] = useState([]);
  const [isDistrictSelected, setDistrictSelected] = useState(false);
  const [isWardSelected, setWardSelected] = useState(false);

  const [error, setError] = useState({})

  ProvinceGetter({ province: address.province, district: address.district, setProvince, setDistrict, setWard, setWardSelected, setDistrictSelected })

  useEffect(() => {
    setAddress({
      name: '',
      phone: '',
      address: '',
      province: '',
      district: '',
      ward: '',
    })
  }, [])

  // Change address data if district or ward is not selected
  useEffect(() => {
    if (!isDistrictSelected)
      setAddress(address => ({
        ...address,
        district: ''
      }))
  }, [isDistrictSelected])

  useEffect(() => {
    if (!isWardSelected)
      setAddress(address => ({
        ...address,
        ward: ''
      }))
  }, [isWardSelected])


  const handleChange = (e) => {
    if (e.target.name === 'district' && e.target.value !== 'default') {
      setDistrictSelected(true);
    }

    if (e.target.name === 'ward' && e.target.value !== 'default') {
      setWardSelected(true);
    }

    if (e.target.name === 'phone') {
      setAddress({
        ...address,
        phone: e.target.value.replace(/\D/g, '')
      })
      return;
    }

    setAddress({
      ...address,
      [e.target.name]: e.target.value
    })
  }

  const handleSave = () => {
    const err = validateAddAddress(address)
    setError(err);
    if (err && Object.keys(err).length !== 0)
      return
    setIsABM(true);
  }

  const handleEscapeByClickOutside = () => {
    hide();
    setTimeout(() => {
      hideParent()
    }, 500)
  }

  return (
    <div className={`${isShowing ? 'opacity-100' : 'opacity-0 pointer-events-none'} flex items-center justify-center h-screen w-full bg-opacity-70 duration-300 transition-opacity fixed bg-gray-500`} onClick={() => { handleEscapeByClickOutside() }}>
      <div className='address-modal w-[640px] text-13 font-semibold' onClick={(e) => e.stopPropagation()}>
        {/* Close button */}
        <div className='absolute top-7 right-7 hover:bg-gray-border transition duration-300 rounded-full cursor-pointer w-8 h-8 flex items-center justify-center'
          onClick={() => { setIsABM(true) }}>
          {crossIcon}
        </div>

        {/* Title */}
        <h1 className='font-extrabold text-[26px] text-center mb-4'>ADD ADDRESS</h1>

        {/* Name + Phone */}
        <div className='flex justify-between gap-8 mt-4'>
          <div className='flex-1'>
            <input className='auth-input text-13 font-semibold' placeholder='Name' name='name' value={address.name} onChange={handleChange} />
            <p className='text-red-500 ml-4 mt-1'>{error.name}</p>
          </div>
          <div className='flex-1'>
            <input className='auth-input text-13 font-semibold' placeholder='Phone' name='phone' value={address.phone} onChange={handleChange} />
            <p className='text-red-500 ml-4 mt-1'>{error.phone}</p>
          </div>
        </div>

        {/* Address + Province */}
        <div className='flex justify-between gap-8 mt-4'>
          <div className='flex-1'>
            <input className='auth-input text-13 font-semibold' placeholder='Address' name='address' value={address.address} onChange={handleChange} />
            <p className='text-red-500 ml-4 mt-1'>{error.address}</p>
          </div>
          <div className='flex-1'>
            <select
              className={`province-combobox text-13 font-semibold ${address.province ? '' : 'text-black-placeholder'}`}
              name='province'
              value={address.province ? address.province : 'default'}
              onChange={handleChange}>
              <option value='default' disabled>Select province</option>
              {createComboboxData(province)}
            </select>
            <p className='text-red-500 ml-4 mt-1'>{error.province}</p>
          </div>
        </div>

        {/* District + Ward */}
        <div className='flex justify-between gap-8 mt-4'>
          <div className='flex-1'>
            <select
              className={`province-combobox text-13 font-semibold ${isDistrictSelected ? '' : 'text-black-placeholder'}`}
              name='district'
              value={isDistrictSelected ? address.district : 'default'}
              onChange={handleChange}>
              <option value='default' disabled>Select district</option>
              {createComboboxData(district)}
            </select>
            <p className='text-red-500 ml-4 mt-1'>{error.district}</p>
          </div>
          <div className='flex-1'>
            <select
              className={`province-combobox text-13 font-semibold ${isWardSelected ? '' : 'text-black-placeholder'}`}
              name='ward'
              value={isWardSelected ? address.ward : 'default'}
              onChange={handleChange}>
              <option value='default' disabled>Select ward</option>
              {createComboboxData(ward)}
            </select>
            <p className='text-red-500 ml-4 mt-1'>{error.ward}</p>
          </div>
        </div>

        {/* Button Cancel + Save */}
        <div className='flex justify-center mt-8 gap-2'>
          <button className='font-semibold bg-gray-button rounded-lg h-9 w-24 hover:bg-gray-500 hover:text-white transition duration-300'
            onClick={() => setIsABM(true)}>Cancel</button>
          <button className='font-semibold bg-primary rounded-lg h-9 w-24 text-white hover:bg-opacity-80 transition duration-300' onClick={() => handleSave()}>Save</button>
        </div>
      </div>
    </div>
  )
}

export default AddAddressModal