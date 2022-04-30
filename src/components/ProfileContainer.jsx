import axios from 'axios'
import React, { useEffect, useState } from 'react'
import MakimaAva from '../images/Makima.jpg'

const divider = <div className='border-t-[1px] border-[#F0F0F0] w-full mt-6' />

// Create axios
const provinceApi = axios.create({
  baseURL: 'https://provinces.open-api.vn/api/'
})

// Create data for combobox
const createComboboxData = data => {
  return data.map((d, i) => <option key={i} value={d.code + '_' + d.name}>
    {d.name}
  </option>)
}

// Handle call API error
const handleApiCallError = err => {
  if (err.response) {
    console.log(err.response.data);
    console.log(err.response.code);
    console.log(err.response.headers);
  } else {
    console.log('Error: ' + err.message);
  }
}

const ProfileContainer = () => {
  const [detail, setDetail] = useState({
    name: '',
    email: '',
    photo: '',
    phone: '',
    address: '',
    gender: '',
    dob: ''
  });
  const [province, setProvince] = useState([]);
  const [district, setDistrict] = useState([]);
  const [isDistrictSelected, setDistrictSelected] = useState(null);
  const [isWardSelected, setWardSelected] = useState(null);
  const [ward, setWard] = useState([]);

  useEffect(() => {
    console.log(isDistrictSelected + ' ' + isWardSelected)
  }, [isWardSelected, isDistrictSelected])

  useEffect(() => {
    setDistrictSelected(isWardSelected => null);
    setWardSelected(null);
  }, [province])

  useEffect(() => {
    setWardSelected(null);
  }, [district])

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await provinceApi.get('/p');
        setProvince(response.data);
      }
      catch (err) {
        handleApiCallError(err);
      }
    }

    fetchProvinces();
  }, [])

  useEffect(() => {
    const fetchDistricts = async () => {
      try {
        const str = String(detail.province);
        const code = str.substring(0, str.indexOf('_'));
        const response = await provinceApi.get(`p/${code}`, {
          params: {
            depth: 2
          }
        })

        setDistrict(response.data.districts);
      } catch (err) {
        handleApiCallError(err);

      }
    }

    if (detail.province)
      fetchDistricts();
  }, [detail.province])

  useEffect(() => {
    const fetchWards = async () => {
      try {
        const str = String(detail.district);
        const code = str.substring(0, str.indexOf('_'));
        const response = await provinceApi.get(`d/${code}`, {
          params: {
            depth: 2
          }
        })

        setWard(response.data.wards);
      } catch (err) {
        handleApiCallError(err);
      }
    }

    if (detail.district)
      fetchWards();
  }, [detail.district])

  // handle user's changes in input
  const handleChange = e => {
    if (e.target.name === 'district' && e.target.value !== 'default') {
      setDistrictSelected(1);
    }

    if (e.target.name === 'ward' && e.target.value !== 'default') {
      setWardSelected(1);
    }

    setDetail({
      ...detail,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = e => {
    e.preventDefault();
  }

  return (
    <form className='mb-10'>
      {/* Header of profile (Including avatar, title, description and Save button) */}
      <div className='flex items-center relative'>
        {/* User's avatar goes here */}
        <div className='rounded-full shadow-circle w-[184px] h-[184px] flex justify-center items-center'>
          <div>
            <img src={MakimaAva} alt="Sample Avatar"
              className='rounded-full w-44 h-44' />
          </div>
        </div>

        {/* Including Title, description */}
        <div className='ml-9'>
          <h1 className='font-bold text-32'>Profile</h1>
          <p className='text-sm mt-2'>Update your photo and personal details.</p>
        </div>

        <button className='save-button'
          onClick={handleSubmit}>Save</button>
      </div>

      {/* Name */}
      <div className='flex mt-16 justify-between text-sm items-center'>
        <p className='min-w-[144px] font-semibold'>Your name</p>

        <input
          type='text'
          className='profile-input'
          name='name'
          value={detail.name}
          onChange={handleChange} />
      </div>

      {divider}

      {/* Email */}
      <div className='flex mt-6 justify-between text-sm items-center'>
        <p className='min-w-[144px] font-semibold'>Your email</p>

        <input
          type='text'
          className='profile-input text-[#515151]'
          name='email'
          disabled
          onChange={handleChange}
          value={detail.email} />
      </div>

      {divider}

      {/* Photo */}
      <div className='flex mt-6 justify-between text-sm items-center'>
        <p className='min-w-[144px] font-semibold'>Your photo</p>

        <div className='flex justify-between items-center w-full ml-36'>
          {/* User's current avatar */}
          <div>
            <img src={MakimaAva} alt="User's ava"
              className='w-20 h-20 rounded-full inline' />
            <span className='ml-3'>This will be displayed on your profile.</span>
          </div>

          {/* Button delete and button update */}
          <div>
            <button className='font-semibold hover:underline' type='button'>Delete</button>
            <button className='ml-4 font-semibold hover:underline' type='button'>Update</button>
          </div>
        </div>
      </div>

      {divider}

      {/* Your phone */}
      <div className='flex mt-6 justify-between text-sm items-center'>
        <p className='min-w-[144px] font-semibold'>Your phone</p>

        <input
          type='text'
          className='profile-input'
          name='phone'
          value={detail.phone}
          onChange={handleChange} />
      </div>

      {divider}

      {/* Your address */}
      <div className='flex mt-6 justify-between text-sm items-center'>
        <p className='min-w-[144px] font-semibold'>Your address</p>

        <input
          type='text'
          className='profile-input'
          name='address'
          value={detail.address}
          onChange={handleChange} />
      </div>

      {divider}

      {/* Province */}
      <div className='flex mt-6 justify-between text-sm items-center'>
        <p className='font-semibold min-w-[144px]'>Province</p>
        <div className='ml-36 w-full grid grid-cols-3 gap-8'>
          {/* Province */}
          <select
            className='province-input'
            name='province'
            defaultValue={'default'}
            placeholder='Province'
            value={detail.province}
            onChange={handleChange}>
            <option disabled value='default' />
            {createComboboxData(province)}
          </select>

          {/* District */}
          <select
            className='province-input'
            name='district'
            placeholder='District'
            value={isDistrictSelected ? detail.district : 'default'}
            onChange={handleChange}>
            <option value='default' disabled />
            {createComboboxData(district)}
          </select>


          {/* Ward */}
          <select
            className='province-input'
            name='ward'
            placeholder='Ward'
            defaultValue='default'
            value={isWardSelected ? detail.ward : 'default'}
            onChange={handleChange}>
            <option value='default' disabled />
            {createComboboxData(ward)}
          </select>
        </div>
      </div>

      {divider}

      {/* Your gender */}
      <div className='flex mt-6 justify-between text-sm items-center'>
        <p className='min-w-[144px] font-semibold'>Gender</p>

        <div className='ml-36 w-full flex items-center font-semibold'>
          <input id='Male' type='radio' name='gender' value='Male' onChange={handleChange} />
          <label htmlFor='Male' className='ml-2'>Male</label>
          <input id='Female' type='radio' name='gender' value='Female' className='ml-10' onChange={handleChange} />
          <label htmlFor='Female' className='ml-2'>Female</label>
          <input id='Other' type='radio' name='gender' value='Other' className='ml-10' onChange={handleChange} />
          <label htmlFor='Other' className='ml-2'>Other</label>
        </div>
      </div>

      {divider}

      {/* Your date of birth */}
      <div className='flex mt-6 justify-between text-sm items-center'>
        <p className='min-w-[144px] font-semibold'>Your date of birth</p>

        <input
          type='text'
          className='profile-input'
          name='dob'
          value={detail.dob}
          onChange={handleChange} />
      </div>

    </form>
  )
}

export default ProfileContainer