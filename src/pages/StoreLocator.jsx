import React, { useState } from 'react'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import LocationPin from '../images/location-pin.png'
import { Icon } from 'leaflet'
import { Link } from 'react-router-dom';
import { useMapEvents } from 'react-leaflet/hooks'
import Menu from '../images/menu-burger.svg'

const position = [10.762622, 106.660172]

const branches = [
  {
    pos: position,
    name: 'Chi nhánh Phạm Văn Đồng',
    address: '12 Phạm Văn Đồng, Quan 10, TP Ho Chi Minh'
  },
  {
    pos: [10.762622, 107.660172],
    name: 'Chi nhánh Phạm Văn Đồng',
    address: '20 Phạm Văn Đồng, Quan 1, TP Ho Chi Minh'
  },
  {
    pos: [10.769622, 106.660172],
    name: 'Chi nhánh Phạm Văn Đồng',
    address: 'KTX Khu A, phuong Linh Trung, quan Thu Duc, TP HCM'
  },
  {
    pos: position,
    name: 'Chi nhánh Phạm Văn Đồng',
    address: '12 Phạm Văn Đồng, Quan 10, TP Ho Chi Minh'
  },
  {
    pos: [10.762622, 107.660172],
    name: 'Chi nhánh Phạm Văn Đồng',
    address: '20 Phạm Văn Đồng, Quan 1, TP Ho Chi Minh'
  },
  {
    pos: [10.769622, 106.660172],
    name: 'Chi nhánh Phạm Văn Đồng',
    address: 'KTX Khu A, phuong Linh Trung, quan Thu Duc, TP HCM'
  },
  {
    pos: position,
    name: 'Chi nhánh Phạm Văn Đồng',
    address: '12 Phạm Văn Đồng, Quan 10, TP Ho Chi Minh'
  },
  {
    pos: [10.762622, 107.660172],
    name: 'Chi nhánh Phạm Văn Đồng',
    address: '20 Phạm Văn Đồng, Quan 1, TP Ho Chi Minh'
  },
  {
    pos: [10.769622, 106.660172],
    name: 'Chi nhánh Phạm Văn Đồng',
    address: 'KTX Khu A, phuong Linh Trung, quan Thu Duc, TP HCM'
  }
]

const BranchChoose = ({ location }) => {
  const map = useMapEvents({})
  if (location.pos === undefined)
    return
  map.flyTo(location.pos, 13);
}

const StoreLocator = () => {
  const [location, setLocation] = useState({})
  const [isShowing, toggle] = useState(true)

  const chooseBranch = (index) => {
    setLocation(branches[index])
  }

  return (
    <div className='-mt-28 relative text-sm'>
      <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
        <BranchChoose location={location} setLocation={setLocation} />

        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {branches.map((marker, index) => <Marker position={marker.pos}
          key={index}
          icon={new Icon({
            iconUrl: LocationPin,
            iconSize: [41, 41],
            iconAnchor: [41, 41]
          })}>
          <Popup>
            Branch {marker.name}
          </Popup>
        </Marker>)}

      </MapContainer>

      {/* Menu */}
      <div className='absolute top-24 left-3 p-2 bg-white rounded-md z-10 cursor-pointer hover:bg-gray-200 transition duration-300'
        onClick={() => toggle(!isShowing)}>
        <img alt='Menu Icon'
          src={Menu}
          className='w-5 h-5' />
      </div>

      {/* Back button */}
      <div className={`absolute left-3 bottom-4 top-24 bg-white bg-opacity-90 rounded-lg w-80 p-4 ${isShowing ? '' : '-translate-x-[120%]'} transition-transform duration-300`}>
        {/* Branches */}
        <div className='mt-7 h-5/6 overflow-auto'>
          {branches.map((branch, index) => <div key={index}>
            {/* Address */}
            <p className='p-4 cursor-pointer hover:bg-gray-300 rounded-md transition duration-300'
              onClick={() => chooseBranch(index)}>
              {branch.address}
            </p>

            {/* Divider */}
            {index !== branches.length - 1 && <p className='border-t-[1px] w-full my-2' />}
          </div>)}
        </div>

        {/* Button */}
        <Link to='/contact'
          className='bg-primary text-white py-2 rounded-md block hover:bg-opacity-90 transition duration-300 absolute bottom-2 left-2 right-2 text-center font-semibold' >
          GO BACK
        </Link>
      </div>
    </div>
  )
}

export default StoreLocator