import React from 'react'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import LocationPin from '../images/location-pin.png'
import { Icon } from 'leaflet'
import { Link } from 'react-router-dom';

const position = [10.762622, 106.660172]

const markers = [
  {
    pos: position,
    name: 'Phạm Văn Đồng'
  }
]

const StoreLocator = () => {
  return (
    <div className='-mt-28 relative'>
      <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {markers.map((marker, index) => <Marker position={marker.pos}
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

      {/* Back button */}
      <div className='absolute left-4 bottom-4 bg-white'>
        <Link to='/contact'
          className='bg-primary text-white px-4 py-2 rounded-md block hover:bg-opacity-90 transition duration-300'>
          GO BACK
        </Link>
      </div>
    </div>
  )
}

export default StoreLocator