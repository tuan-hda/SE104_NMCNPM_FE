import React, { useEffect, useState } from 'react'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import LocationPin from '../images/location-pin.png'
import { Icon } from 'leaflet'
import { Link } from 'react-router-dom';
import { useMapEvents } from 'react-leaflet/hooks'
import Menu from '../images/menu-burger.svg'
import api from '../api/appApi'
import * as routes from '../api/apiRoutes'

const StoreLocator = () => {
  const [location, setLocation] = useState({})
  const [isShowing, toggle] = useState(true)
  const [branches, setBranches] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchLocation = async () => {
    try {
      const result = await api.get(routes.GET_RESTAURANT, routes.getRestaurantParams('ALL'))
      setBranches(result.data.restaurants)
    } catch (err) {
      if (err.response) {
        console.log(err.response.data)
        console.log(err.response.status)
        console.log(err.response.headers)
      } else {
        console.log(err.message)
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchLocation()
  }, [])

  // Change current branch
  const chooseBranch = (index) => {
    setLocation(branches[index])
  }

  // Fly the map after choose branch
  const BranchChoose = ({ location }) => {
    const map = useMapEvents({})
    if (location.latitude === undefined || location.longitude === undefined)
      return
    map.flyTo(getLocation(location), 13);
  }

  // Get location from marker / branch
  const getLocation = marker => {
    return [marker.longitude, marker.latitude]
  }

  // Get open / close time
  const getOpenTime = branch => branch.openData.fromHour + ':' + (branch.openData.fromMin === 0 ? '00' : branch.openData.fromMin)
  const getCloseTime = branch => branch.openData.toHour + ':' + (branch.openData.toMin === 0 ? '00' : branch.openData.toMin)

  return (loading ?
    null
    :
    <div className='-mt-28 relative text-sm'>
      <MapContainer center={getLocation(branches[0])} zoom={13} scrollWheelZoom={false}>
        <BranchChoose location={location} />

        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {branches.map((marker, index) => <Marker position={getLocation(marker)}
          key={index}
          icon={new Icon({
            iconUrl: LocationPin,
            iconSize: [41, 41],
            iconAnchor: [41, 41]
          })}>
          <Popup>
            Branch {marker.resAddress}
            <br />
            Open from {getOpenTime(marker)} to {getCloseTime(marker)}
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
              {branch.resAddress}
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
    </div >
  )
}

export default StoreLocator