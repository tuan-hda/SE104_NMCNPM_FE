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
        if (!result || !result.district)
          setDistrictSelected(false);
        else {
          setDistrictSelected(true)
          setInfo((prevInfo) => ({
            ...prevInfo,
            district: result.district
          }))
        }
        setWardSelected(false);
        //dispatch(setDistrict(response.data.districts));
        setDistrict(normalizeText(response.data.districts));
        setWard([])
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
        if (!result || !result.ward)
          setWardSelected(false);
        else {
          setWardSelected(true)
          setInfo((prevInfo) => ({
            ...prevInfo,
            ward: result.ward
          }))
        }
        //dispatch(setWard(response.data.wards))
        setWard(normalizeText(response.data.wards));
      } catch (err) {
        handleApiCallError(err);
      }
    }

    if (district)
      fetchWards();
  }, [district])

  // This sets district received from Addressbook
  // useEffect(() => {
  //   //console.log('isDistrictDone ' + isDistrictDone)
  //   if (result && info && isDistrictDone && isAddressImported) {
  //     setDistrictSelected(true);
  //   }
  // }, [isDistrictDone])

  // This sets ward received from Addressbook
  // useEffect(() => {
  //   //  console.log('isWardDone ' + isWardDone)
  //   if (result && info && isWardDone && isAddressImported) {
  //     setWardSelected(true);
  //     setIsAddressImported(false)
  //   }
  // }, [isWardDone])
}

export default ProvinceGetter