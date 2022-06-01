import React, { useEffect, useState } from 'react'
import DefaultAvatar from '../images/User-avatar.svg'
import useModal from '../utils/useModal'
import AlertModal from './modals/AlertModal'
import GenderRadioButton from './GenderRadioButton'
import ProvinceGetter from './ProvinceGetter'
import * as routes from '../api/apiRoutes'
import api from '../api/appApi'
import { storage } from '../firebase'
import LoadingScreen from './LoadingScreen'

const divider = <div className='border-t-[1px] border-[#F0F0F0] w-full mt-6' />

// Define default user avatar
const defaultAvatar = (style) => <svg
  className={`rounded-full inline object-cover fill-gray-500 ${style}`}
  xmlns="http://www.w3.org/2000/svg" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 512 512">
  <g>
    <circle cx="256" cy="128" r="128" />
    <path d="M256,298.667c-105.99,0.118-191.882,86.01-192,192C64,502.449,73.551,512,85.333,512h341.333   c11.782,0,21.333-9.551,21.333-21.333C447.882,384.677,361.99,298.784,256,298.667z" />
  </g>
</svg>


// // Create axios
// const provinceApi = axios.create({
//   baseURL: 'https://provinces.open-api.vn/api/'
// })

// Create data for combobox
const createComboboxData = data => {
  return data.map((d, i) => <option key={i} value={d.code + '_' + d.name}>
    {d.name}
  </option>)
}

// // Handle call API error
// const handleApiCallError = err => {
//   if (err.response) {
//     console.log(err.response.data);
//     console.log(err.response.code);
//     console.log(err.response.headers);
//   } else {
//     console.log('Error: ' + err.message);
//   }
// }

const ProfileContainer = () => {
  const [detail, setDetail] = useState({
    name: '',
    email: '',
    photo: null,
    phone: '',
    address: '',
    gender: '',
    dob: ''
  });

  // Get province, district and ward state from store
  // const province = useSelector((state) => state.province);
  // const district = useSelector((state) => state.district);
  // const ward = useSelector((state) => state.ward);

  const [province, setProvince] = useState([]);
  const [district, setDistrict] = useState([]);
  const [ward, setWard] = useState([]);
  const [isDistrictSelected, setDistrictSelected] = useState(null);
  const [isWardSelected, setWardSelected] = useState(null);
  const { isShowing, toggle } = useModal();
  const [loading, setLoading] = useState(false)
  // Get result of Modal
  const [modalResult, setModalResult] = useState(-1);
  // Province, District and Ward fetched from API
  const [addr, setAddr] = useState({})
  // Store upload image of user temporarily
  const [image, setImage] = useState()

  // Delete user avatar if modalResult = 1
  useEffect(() => {
    switch (modalResult) {
      case 1:
        setDetail(detail => ({
          ...detail,
          photo: null
        }))
        break;
      default: break;
    }
  }, [modalResult])

  ProvinceGetter({ province: detail.province, district: detail.district, setProvince, setDistrict, setWard, setWardSelected, setDistrictSelected, setInfo: setDetail, result: addr, setResult: setAddr })

  // // Fetch province data
  // useEffect(() => {
  //   const fetchProvinces = async () => {
  //     try {
  //       const response = await provinceApi.get('/p');
  //       //dispatch(setProvince(response.data))
  //       setProvince(response.data);
  //     }
  //     catch (err) {
  //       handleApiCallError(err);
  //     }
  //   }

  //   fetchProvinces();
  // }, [])


  // // Fetch district data after user choose province
  // useEffect(() => {
  //   const fetchDistricts = async () => {
  //     try {
  //       const str = String(detail.province);
  //       const code = str.substring(0, str.indexOf('_'));
  //       const response = await provinceApi.get(`p/${code}`, {
  //         params: {
  //           depth: 2
  //         }
  //       })

  //       setDistrictSelected(null);
  //       setWardSelected(null);
  //       //dispatch(setDistrict(response.data.districts));
  //       setDistrict(response.data.districts);
  //     } catch (err) {
  //       handleApiCallError(err);
  //     }
  //   }

  //   if (detail.province)
  //     fetchDistricts();
  // }, [detail.province])

  // // Fetch ward data after user choose district
  // useEffect(() => {
  //   const fetchWards = async () => {
  //     try {
  //       const str = String(detail.district);
  //       const code = str.substring(0, str.indexOf('_'));
  //       const response = await provinceApi.get(`d/${code}`, {
  //         params: {
  //           depth: 2
  //         }
  //       })

  //       setWardSelected(null);
  //       //dispatch(setWard(response.data.wards))
  //       setWard(response.data.wards);
  //     } catch (err) {
  //       handleApiCallError(err);
  //     }
  //   }

  //   if (detail.district)
  //     fetchWards();
  // }, [detail.district])

  // Handle user's changes in input
  const handleChange = e => {
    if (e.target.name === 'district' && e.target.value !== 'default') {
      setDistrictSelected(true);
    }

    if (e.target.name === 'ward' && e.target.value !== 'default') {
      setWardSelected(true);
    }

    setDetail({
      ...detail,
      [e.target.name]: e.target.value
    })
  }

  // Handle gender selection
  const handleGenderSelect = (g) => {
    setDetail({
      ...detail,
      gender: g
    })
  }

  const handleSubmit = e => {
    setLoading(true)
    e.preventDefault();
    if (image)
      handleUploadImage()
    else
      updateProfile(detail.photo)
  }

  // Handle when user update photo
  const handlePhotoChange = e => {
    setImage(e.target.files[0])
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setDetail({
          ...detail,
          photo: reader.result
        })
      }
    }
    reader.readAsDataURL(e.target.files[0]);
  }

  const handleUploadImage = () => {
    const task = storage.ref(`images/${image.name}`).put(image)
    task.on(
      "state_changed",
      snapshot => { },
      error => {
        console.log(error)
      },
      () => {
        storage
          .ref('images')
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            setDetail((previousState) => ({
              ...previousState,
              photo: url
            }))
            updateProfile(url)
          })
      }
    )
  }

  // Update profile. We need a photoUrl parameter here since we need the result from
  // uploading user's avatar
  const updateProfile = async (photoUrl) => {
    try {
      await api.put(routes.EDIT_PROFILE, routes.getEditProfileBody(
        1,
        detail.name,
        detail.dob,
        detail.phone,
        detail.gender,
        photoUrl,
        detail.address,
        detail.province,
        detail.district,
        detail.ward
      ))
    } catch (err) {
      if (err.response) {
        console.log(err.response.data)
        console.log(err.response.headers)
        console.log(err.response.status)
      } else {
        console.log(err.message)
      }
    } finally {
      setLoading(false)
    }
  }

  // Fetch data from api in first render
  const fetchProfile = async () => {
    setLoading(true)
    try {
      const result = await api.get(routes.GET_PROFILE, routes.getProfileId(1))
      setProfile(result.data.users)
    } catch (err) {
      if (err.response) {
        console.log(err.response.data)
        console.log(err.response.headers)
        console.log(err.response.status)
      } else {
        console.log(err.message)
      }
    } finally {
      setLoading(false)
    }
  }

  // Set profile using fetched data
  // We will only set province. District and ward needed to be set inside ProvinceGetter.
  // To do that, i create here an 'addr' state. This will contain temporary information about
  // district and ward. Then pass it to ProvinceGetter and let that component handles the rest
  const setProfile = data => {
    setDetail((previousState) => ({
      ...previousState,
      name: data.name,
      dob: data.dob.substring(0, 10),
      email: data.email,
      photo: data.avatar,
      phone: data.phoneNumber,
      gender: data.gender,
      address: data.Addresses.detail,
      province: data.Addresses.province
    }))

    setAddr({
      district: data.Addresses.district,
      ward: data.Addresses.ward
    })
  }

  useEffect(() => {
    fetchProfile()
  }, [])

  return (
    <form className='mb-10' onSubmit={e => e.preventDefault()}>
      {loading && <LoadingScreen loading={true} />}

      {/* Header of profile (Including avatar, title, description and Save button) */}
      <div className='lg:flex-row flex-col flex items-center relative lg:gap-12'>
        {/* User's avatar goes here */}
        <div className='rounded-full shadow-circle w-[184px] h-[184px] flex justify-center items-center'>
          <div>
            {detail.photo ? <img src={detail.photo || DefaultAvatar} alt="Sample Avatar"
              className='rounded-full w-44 h-44 object-contain' />
              : defaultAvatar('w-44 h-44')
            }
          </div>
        </div>

        {/* Including Title, description */}
        <div className='flex justify-between items-center flex-1 w-full lg:mt-0 mt-4 lg:ml-9 lg:w-auto'>
          <div className=''>
            <h1 className='font-bold text-32'>Profile</h1>
            <p className='text-sm mt-2'>Update your photo and personal details.</p>
          </div>

          <button className='profile-save-button'
            onClick={handleSubmit}>Save</button>
        </div>
      </div>

      {/* Name */}
      <div className='profile-div'>
        <p className='sm:w-24 w-full lg:w-36 font-semibold'>Your name</p>

        <input
          type='text'
          className='profile-input'
          name='name'
          value={detail.name}
          onChange={handleChange} />
      </div>

      {divider}

      {/* Email */}
      <div className='profile-div'>
        <p className='sm:w-24 w-full lg:w-36 font-semibold'>Your email</p>

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
      <div className='profile-div'>
        <p className='sm:w-24 w-full lg:w-36 font-semibold'>Your photo</p>

        <div className='flex justify-between flex-1 items-center gap-3 '>
          {/* User's current avatar */}
          <div className='flex items-center gap-2'>
            <div>
              {detail.photo ? <img src={detail.photo} alt="User's ava"
                className='w-20 aspect-square rounded-full inline object-cover fill-gray-500' />
                : defaultAvatar('w-20 h-20')
              }

            </div>
            <span>This will be displayed on your profile.</span>
          </div>

          {/* Button delete and button update */}
          <div className='flex sm:flex-row sm:gap-4 gap-2 flex-col'>
            <button className='font-semibold hover:underline' type='button'
              onClick={toggle}>Delete</button>
            <AlertModal msg='Are you sure you want to delete your photo?' isShowing={isShowing}
              hide={toggle} setResult={setModalResult} />

            <label className='font-semibold hover:underline cursor-pointer' htmlFor='photo'>Update</label>
            <input className='hidden' type='file' onChange={handlePhotoChange} id='photo'
              accept='image/*' />
          </div>
        </div>
      </div>

      {divider}

      {/* Your phone */}
      <div className='profile-div'>
        <p className='sm:w-24 w-full lg:w-36 font-semibold'>Your phone</p>

        <input
          type='text'
          className='profile-input'
          name='phone'
          value={detail.phone}
          onChange={handleChange} />
      </div>

      {divider}

      {/* Your address */}
      <div className='profile-div'>
        <p className='sm:w-24 w-full lg:w-36 font-semibold'>Your address</p>

        <input
          type='text'
          className='profile-input'
          name='address'
          value={detail.address}
          onChange={handleChange} />
      </div>

      {divider}

      {/* Province */}
      <div className='profile-div'>
        <p className='sm:w-24 w-full lg:w-36 font-semibold'>Province</p>

        <select
          className='province-input'
          name='province'
          defaultValue={'default'}
          placeholder='Province'
          value={detail.province}
          onChange={handleChange}>
          <option disabled value='default' >Choose province</option>
          {createComboboxData(province)}
        </select>
      </div>

      {divider}

      {/* District */}
      <div className='profile-div'>
        <p className='sm:w-24 w-full lg:w-36 font-semibold'>District</p>

        <select
          className='province-input'
          name='district'
          placeholder='District'
          value={isDistrictSelected ? detail.district : 'default'}
          onChange={handleChange}>
          <option disabled value='default' >Choose district</option>
          {createComboboxData(district)}
        </select>
      </div>

      {divider}

      {/* Ward */}
      <div className='profile-div'>
        <p className='sm:w-24 w-full lg:w-36 font-semibold'>Ward</p>

        <select
          className='province-input'
          name='ward'
          placeholder='Ward'
          value={isWardSelected ? detail.ward : 'default'}
          onChange={handleChange}>
          <option disabled value='default' >Choose ward</option>
          {createComboboxData(ward)}
        </select>
      </div>

      {divider}

      {/* Your gender */}
      <div className='profile-div'>
        <p className='sm:w-24 w-full lg:w-36 font-semibold'>Gender</p>

        <GenderRadioButton
          OnClick={handleGenderSelect}
          currGender={detail.gender}
          setDetail={setDetail} />
      </div>


      {divider}

      {/* Your date of birth */}
      <div className='profile-div'>
        <p className='sm:w-24 w-full lg:w-36 font-semibold'>Your date of birth</p>

        <input
          type='date'
          className='profile-input'
          name='dob'
          value={detail.dob}
          onChange={handleChange} />
      </div>

    </form >
  )
}

export default ProfileContainer