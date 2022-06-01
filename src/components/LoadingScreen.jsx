import React from 'react'
import { HashLoader } from 'react-spinners'

const override = {
  margin: 'auto'
}

const LoadingScreen = ({ loading, bgopacity }) => {
  return (loading &&
    <div className={`fixed top-0 left-0 h-screen w-screen z-20 bg-white ${bgopacity ? '' : 'bg-opacity-80'} flex`}>
      <HashLoader loading={true} size={50} css={override} color='#E16246' />
    </div>
  )
}

export const hambursyLoader = <HashLoader loading={true} size={50} color='#E16246' />
export default LoadingScreen