import React, { useEffect, useState } from 'react'
import useModal from '../../utils/useModal';
import AddAddressModal from './AddAddressModal';

const crossIcon = <svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 512.021 512.021" className='w-4 h-4 ' >
  <g>
    <path d="M301.258,256.01L502.645,54.645c12.501-12.501,12.501-32.769,0-45.269c-12.501-12.501-32.769-12.501-45.269,0l0,0   L256.01,210.762L54.645,9.376c-12.501-12.501-32.769-12.501-45.269,0s-12.501,32.769,0,45.269L210.762,256.01L9.376,457.376   c-12.501,12.501-12.501,32.769,0,45.269s32.769,12.501,45.269,0L256.01,301.258l201.365,201.387   c12.501,12.501,32.769,12.501,45.269,0c12.501-12.501,12.501-32.769,0-45.269L301.258,256.01z" />
  </g>
</svg>

const AddressBookModal = ({ ABM_isShowing, hide, setResult }) => {
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      name: 'Nguyen Van A',
      phone: '0123456789',
      address: 'KTX Khu A, Khu pho 6',
      province: 'TP Ho Chi Minh',
      district: 'Quan Thu Duc',
      ward: 'Phuong Linh Trung'
    }, {
      id: 6,
      name: 'Nguyen Van A',
      phone: '0123456789',
      address: 'KTX Khu A, Khu pho 6',
      province: 'TP Ho Chi Minh',
      district: 'Quan Thu Duc',
      ward: 'Phuong Linh Trung'
    }, {
      id: 7,
      name: 'Nguyen Van A',
      phone: '0123456789',
      address: 'KTX Khu A, Khu pho 6',
      province: 'TP Ho Chi Minh',
      district: 'Quan Thu Duc',
      ward: 'Phuong Linh Trung'
    },
    {
      id: 2,
      name: 'Nguyen Van A',
      phone: '0123456789',
      address: 'KTX Khu A, Khu pho 6',
      province: 'TP Ho Chi Minh',
      district: 'Quan Thu Duc',
      ward: 'Phuong Linh Trung'
    },
    {
      id: 3,
      name: 'Nguyen Van A',
      phone: '0123456789',
      address: 'KTX Khu A, Khu pho 6',
      province: 'TP Ho Chi Minh',
      district: 'Quan Thu Duc',
      ward: 'Phuong Linh Trung'
    },
    {
      id: 4,
      name: 'Nguyen Van A',
      phone: '0123456789',
      address: 'KTX Khu A, Khu pho 6',
      province: 'TP Ho Chi Minh',
      district: 'Quan Thu Duc',
      ward: 'Phuong Linh Trung'
    },
    {
      id: 5,
      name: 'Nguyen Van A',
      phone: '0123456789',
      address: 'KTX Khu A, Khu pho 6',
      province: 'TP Ho Chi Minh',
      district: 'Quan Thu Duc',
      ward: 'Phuong Linh Trung'
    },
  ]);
  const [currAddress, setCurrAddress] = useState();

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

  // Get Address item
  const getAddressItems = (address, index) => {
    return <div key={index} className={`text-13 cursor-pointer  transition duration-300 font-medium mt-4 px-6 py-5 border-[1px] border-gray-border rounded-lg ${currAddress && currAddress.id === addresses[index].id ? 'bg-primary text-white' : 'hover:bg-gray-100'}`}
      onClick={() => handleSelectAddress(index)}>
      <p>
        {address.name}, {address.phone}
      </p>
      <p className='mt-1'>
        {address.address}, {address.ward}, {address.district}, {address.province}
      </p>
    </div>
  }

  // Full screen layer
  return (<div className={`${ABM_isShowing ? 'opacity-100' : 'opacity-0 pointer-events-none'} flex items-center justify-center h-screen w-full bg-opacity-70 duration-300 transition-opacity fixed bg-gray-500`} onClick={() => hide()}>

    {/* Add Address Modal */}
    <div className={`${isShowing ? '' : 'opacity-0 pointer-events-none'} absolute`}
      onClick={e => e.stopPropagation()}>
      {< AddAddressModal AAM_isShowing={isShowing} hide={toggle} />}
    </div>

    {/* Address Book Modal */}
    <div className={`${isShowing ? 'opacity-0 pointer-events-none' : ''} absolute`}>
      <div className='w-[640px] max-h-[640px] address-modal' onClick={(e) => {
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
            onClick={() => toggle()}
          >
            Add address
          </button>
        </div>
      </div>
    </div>
  </div >
  )
}

export default AddressBookModal