import React, { useEffect, useState } from 'react'
import appApi from '../../api/appApi';
import useModal from '../../utils/useModal';
import AddAddressModal from './AddAddressModal';
import * as routes from '../../api/apiRoutes'
import { hambursyLoader } from '../LoadingScreen'

const crossIcon = <svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 512.021 512.021" className='w-4 h-4 ' >
  <g>
    <path d="M301.258,256.01L502.645,54.645c12.501-12.501,12.501-32.769,0-45.269c-12.501-12.501-32.769-12.501-45.269,0l0,0   L256.01,210.762L54.645,9.376c-12.501-12.501-32.769-12.501-45.269,0s-12.501,32.769,0,45.269L210.762,256.01L9.376,457.376   c-12.501,12.501-12.501,32.769,0,45.269s32.769,12.501,45.269,0L256.01,301.258l201.365,201.387   c12.501,12.501,32.769,12.501,45.269,0c12.501-12.501,12.501-32.769,0-45.269L301.258,256.01z" />
  </g>
</svg>

const getProvinceName = (p) => p.substring(p.indexOf('_') + 1)

const AddressBookModal = ({ isABM, setIsABM, ABM_isShowing, hide, setResult }) => {
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      name: 'Nguyen Van A',
      phone: '0123456789',
      address: 'KTX Khu A, Khu pho 6',
      province: '79_Thanh pho Ho Chi Minh',
      district: '769_Thanh pho Thu Duc',
      ward: '26800_Phuong Linh Trung'
    },
    {
      id: 2,
      name: 'Nguyen Van A',
      phone: '0123456789',
      address: 'KTX Khu A, Khu pho 6',
      province: '79_Thanh pho Ho Chi Minh',
      district: '769_Thanh pho Thu Duc',
      ward: '26800_Phuong Linh Trung'
    },
  ]);
  const [loading, setLoading] = useState(false)


  // Fetch addresses of user
  const fetchAddresses = async () => {
    try {
      const result = await appApi.get(routes.GET_ADDRESSES, routes.getAddressParams(1))
      const addressData = result.data.addresses.map((a, i) => {
        return {
          ...a,
          address: a.detail,
          name: a.User.name,
          phone: a.User.phoneNumber
        }
      })
      setAddresses(addressData)
      console.log(result)
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  // Fetch data each time open the modal
  useEffect(() => {
    if (ABM_isShowing) {
      setLoading(true)
      fetchAddresses()
    }
  }, [ABM_isShowing])

  const [currAddress, setCurrAddress] = useState();

  // Specify which address is being edited, default is none
  const [currEditAddress, setCurrEditAddress] = useState()

  // React hook for Add Address Modal
  const { isShowing, toggle } = useModal();

  // Default address
  useEffect(() => {
    setCurrAddress(addresses[0]);
  }, [])

  // Handle address select
  const handleSelectAddress = (index) => {
    setCurrAddress(addresses[index]);
    setResult(addresses[index])
    hide();
  }

  const handleAddressEdit = (e, index) => {
    e.stopPropagation();
    setCurrEditAddress(addresses[index])
    toggle()
    setIsABM(false)
  }

  // Get Address item
  const getAddressItems = (address, index) => {
    return <div key={index} className={`text-13 mt-4 pl-6 pr-20 pt-5 pb-6 cursor-pointer transition duration-300 font-medium border-[1px] border-gray-border rounded-lg relative group ${currAddress && currAddress.id === addresses[index].id ? 'bg-primary text-white' : 'hover:bg-gray-100'}`}
      onClick={() => handleSelectAddress(index)}>
      <p>
        {address.name}, {address.phone}
      </p>
      <p className='mt-1'>
        {address.address}, {getProvinceName(address.ward)}, {getProvinceName(address.district)}, {getProvinceName(address.province)}
      </p>
      <p className='text-black hover:font-bold hidden group-hover:block absolute bottom-4 right-4'
        onClick={(e) => handleAddressEdit(e, index)}>
        Edit
      </p>
    </div>
  }

  // Show AAM 
  const showAAM = () => {
    toggle();
    setIsABM(false);
  }

  // Full screen layer
  return (isABM ? <div className={`${ABM_isShowing ? 'opacity-100' : 'opacity-0 pointer-events-none'} address-modal-layer`} onClick={() => hide()}>
    {loading && <div className='absolute top-[50%] z-20'>
      {hambursyLoader}
    </div>}
    {/* Address Book Modal */}
    <div className='address-modal' onClick={(e) => {
      e.stopPropagation();
    }}>

      {/* Close button */}
      <div className='absolute top-7 right-7 hover:bg-gray-border transition duration-300 rounded-full cursor-pointer w-8 h-8 flex items-center justify-center'
        onClick={() => { hide() }}>
        {crossIcon}
      </div>

      {/* Title */}
      <h1 className='font-extrabold text-[26px] mb-2 text-center'>ADDRESS BOOK</h1>

      {/* User's addresses */}
      {addresses.map((address, index) => getAddressItems(address, index))}

      {/* Fill the gap between User's addresses and Save button */}
      <div className='flex-grow' />

      {/* Add address button */}
      <div className='flex justify-center mt-7'>
        <button className='w-40 font-semibold text-13 bg-gray-border rounded-lg h-10 hover:bg-gray-500 hover:text-white duration-300 transition'
          onClick={() => showAAM()}>
          Add address
        </button>
      </div>
    </div>
  </div>
    :
    <AddAddressModal setIsABM={setIsABM} isShowing={isShowing} hide={toggle} hideParent={hide} currEditAddress={currEditAddress} setCurrEditAddress={setCurrEditAddress} />
  )
}

export default AddressBookModal