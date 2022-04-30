import React, { useState } from 'react'

const gender = ['Male', 'Female', 'Other']

const Test = () => {
  const [currGender, setGender] = useState(null);

  const handleClick = value => {
    setGender(value);
  }

  const getRdoStyle = value => {
    if (value === currGender)
      return 'rounded-full border-[1px] w-6 h-6 p-[4.5px] flex items-center justify-center' +
        'hover:bg-gray-300 cursor-pointer border-primary';
    return 'rounded-full border-[1px] w-6 h-6 p-[4.5px] flex items-center justify-center' +
      'hover:bg-gray-300 cursor-pointer border-gray-rdo'
  }

  const getRadioButton = (value, index) => <div
    key={index}
    className='flex items-center cursor-pointer'
    onClick={() => handleClick(value)}>

    <div className={getRdoStyle(value)}>
      <p className={'rounded-full bg-primary w-full h-full' + (currGender === value ? '' : 'hidden')} />
    </div>

    <span className='ml-4'>{value}</span>
  </div>


  return (<div className='flex gap-4'>
    {gender.map((g, i) => getRadioButton(g, i))}
  </div>)
}

export default Test