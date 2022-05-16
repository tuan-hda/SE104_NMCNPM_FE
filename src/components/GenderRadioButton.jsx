import React, { useState } from 'react'

const gender = ['Male', 'Female', 'Other']

const GenderRadioButton = ({ OnClick }) => {
  const [currGender, setGender] = useState(null);

  const handleClick = value => {
    OnClick(value);
    setGender(value);
  }

  const getRdoStyle = value => {
    if (value === currGender)
      return 'rounded-full border-[1px] w-6 h-6 p-1 flex items-center justify-center' +
        'hover:bg-gray-300 cursor-pointer border-primary';
    return 'rounded-full border-[1px] w-6 h-6 p-1 flex items-center justify-center' +
      'hover:bg-gray-300 cursor-pointer border-gray-rdo'
  }

  const getRadioButton = (value, index) => <div
    key={index}
    className='flex items-center cursor-pointer'
    value={currGender}
    name='gender'
    onClick={() => handleClick(value)}>

    <div className={getRdoStyle(value)}>
      <p className={'rounded-full bg-primary w-full h-full' + (currGender === value ? '' : 'hidden')} />
    </div>

    <span className='ml-2'>{value}</span>
  </div>


  return (<div className='flex flex-1 flex-col md:flex-row gap-4 md:gap-10 font-medium'>
    {gender.map((g, i) => getRadioButton(g, i))}
  </div>)
}

export default GenderRadioButton