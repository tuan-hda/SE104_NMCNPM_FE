import axios from 'axios'
import { useEffect, useState } from 'react'
import removeAccents from '../utils/removeAccents';

const provinceApi = axios.create({
  baseURL: 'https://provinces.open-api.vn/api/'
})

// Handle call API error
const handleApiCallError = err => {
  if (err.response) {
    console.log(err.response.data);
    console.log(err.response.code);
    console.log(err.response.headers);
  } else {
    console.log('Error: ' + err.message);
  }
}

// Normalize text
const normalizeText = (data) => {
  return data.map((d) => {
    return {
      ...d,
      name: removeAccents(d.name)
    }
  })
}

const ProvinceGetter = ({ province, district, setProvince, setDistrict, setWard, setWardSelected, setDistrictSelected, info, setInfo, result, isAddressImported, setIsAddressImported }) => {
  // Last five parameters are optional
  const [isDistrictDone, setIsDistrictDone] = useState(false);
  const [isWardDone, setIsWardDone] = useState(false);

  // Fetch province data
  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await provinceApi.get('/p');
        //dispatch(setProvince(response.data))
        setProvince(normalizeText(response.data));
      }
      catch (err) {
        handleApiCallError(err);
      }
    }

    fetchProvinces();
  }, [])


  // Fetch district data after user choose province
  useEffect(() => {
    setIsDistrictDone(isDistrictDone => false)
    const fetchDistricts = async () => {
      try {
        const str = String(province);
        const code = str.substring(0, str.indexOf('_'));
        const response = await provinceApi.get(`p/${code}`, {
          params: {
            depth: 2
          }
        })

        //console.log(1)
        setDistrictSelected(false);
        setWardSelected(false);
        //dispatch(setDistrict(response.data.districts));
        setDistrict(normalizeText(response.data.districts));
        setWard([])
        setIsDistrictDone(isDistrictDone => true);
        setIsWardDone(isWardDone => false)
      } catch (err) {
        handleApiCallError(err);
      }
    }

    if (province)
      fetchDistricts();
  }, [province])

  // Fetch ward data after user choose district
  useEffect(() => {
    const fetchWards = async () => {
      try {
        const str = String(district);
        const code = str.substring(0, str.indexOf('_'));
        const response = await provinceApi.get(`d/${code}`, {
          params: {
            depth: 2
          }
        })

        //console.log(2);
        setWardSelected(false);
        //dispatch(setWard(response.data.wards))
        setWard(normalizeText(response.data.wards));
        setIsWardDone(isWardDone => true);
      } catch (err) {
        handleApiCallError(err);
      }
    }

    if (district)
      fetchWards();
  }, [district])

  // This sets district received from Addressbook
  useEffect(() => {
    //console.log('isDistrictDone ' + isDistrictDone)
    if (result && info && isDistrictDone && isAddressImported) {
      setDistrictSelected(true);
      setInfo((info) => ({
        ...info,
        district: result.district
      }))
    }
  }, [isDistrictDone])

  // This sets ward received from Addressbook
  useEffect(() => {
    //  console.log('isWardDone ' + isWardDone)
    if (result && info && isWardDone && isAddressImported) {
      setWardSelected(true);
      setInfo((info) => ({
        ...info,
        ward: result.ward
      }))
      setIsAddressImported(false)
    }
  }, [isWardDone])
}

export default ProvinceGetter