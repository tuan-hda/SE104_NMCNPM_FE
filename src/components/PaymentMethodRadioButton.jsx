import React, { useState } from 'react'
import MomoLogo from '../images/MomoLogo.png'

const methods = ['COD', 'Momo', 'Paypal']
const icons = {
  COD: <svg xmlns="http://www.w3.org/2000/svg"
    className='w-4'
    viewBox="0 0 24 24"><path d="M19,5H16.9A5.009,5.009,0,0,0,12,1H5A5.006,5.006,0,0,0,0,6v9a4,4,0,0,0,3.061,3.877,3.5,3.5,0,1,0,6.9.123h4.082a3.465,3.465,0,0,0-.041.5,3.5,3.5,0,0,0,7,0,3.4,3.4,0,0,0-.061-.623A4,4,0,0,0,24,15V10A5.006,5.006,0,0,0,19,5Zm3,5v1H17V7h2A3,3,0,0,1,22,10ZM2,15V6A3,3,0,0,1,5,3h7a3,3,0,0,1,3,3V17H4A2,2,0,0,1,2,15Zm6,4.5a1.5,1.5,0,0,1-3,0,1.418,1.418,0,0,1,.093-.5H7.907A1.418,1.418,0,0,1,8,19.5ZM17.5,21A1.5,1.5,0,0,1,16,19.5a1.41,1.41,0,0,1,.093-.5h2.814a1.41,1.41,0,0,1,.093.5A1.5,1.5,0,0,1,17.5,21ZM20,17H17V13h5v2A2,2,0,0,1,20,17Z" /></svg>,
  Momo: <img className='w-4' src={MomoLogo} alt='Momo Logo' />,
  Paypal: <svg xmlns="http://www.w3.org/2000/svg" className='w-4' viewBox="0 0 24 24">
    <g>
      <path d="M22.011,11.414c-0.871,4.416-3.815,5.948-7.569,5.948h-0.57c-0.481,0-0.871,0.33-0.931,0.781l-0.06,0.24l-0.721,4.626   l-0.03,0.21C12.039,23.67,11.648,24,11.198,24H7.233c-0.33-0.03-0.54-0.33-0.48-0.631l0.3-2.042H2.367   c-0.36-0.03-0.601-0.36-0.54-0.721L4.95,0.901C5.04,0.39,5.49,0,6.001,0h7.449c2.583,0,4.596,0.54,5.677,1.802   c1.021,1.171,1.321,2.433,1.021,4.295c-0.24-0.12-0.511-0.24-0.811-0.33c-0.39-0.12-0.781-0.21-1.171-0.27   c-0.57-0.09-1.231-0.15-1.922-0.15h-5.827c-0.481,0-0.871,0.33-0.931,0.781l-1.261,7.87l-0.04,0.248   c0.097-0.504,0.526-0.908,1.061-0.908h2.193c4.296,0,7.66-1.742,8.621-6.789c0.03-0.15,0.06-0.3,0.09-0.45   c0.42,0.21,0.781,0.481,1.081,0.841C22.191,8.02,22.371,9.582,22.011,11.414z" />
    </g>
  </svg>
}

const PaymentMethodRadioButton = ({ currMethod, setMethod }) => {
  const handleClick = (m) => {
    setMethod(m);
  }

  const getRadioButton = (m, i) => {
    return <div key={i} className='flex items-center rounded-lg border-[1px] border-gray-border h-14 cursor-pointer px-4 text-13 font-semibold' onClick={() => handleClick(m)}>
      {/* Button */}
      <div className={`flex items-center justify-center rounded-full border-[1px] w-6 h-6 ${m === currMethod ? 'border-primary' : 'border-gray-border'}`}>
        <p className={`rounded-full w-3 h-3 bg-primary ${m === currMethod ? '' : 'hidden'}`} />
      </div>

      {/* Icon */}
      <div className='ml-7'>
        {icons[m]}
      </div>

      {/* Label */}
      <p className='ml-6'>{m}</p>
    </div>
  }

  return (
    <div className='space-y-4'>
      {methods.map((m, i) => getRadioButton(m, i))}
    </div>
  )
}

export default PaymentMethodRadioButton