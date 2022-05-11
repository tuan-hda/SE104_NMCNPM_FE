import axios from 'axios'
import { useEffect } from 'react'
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

const ProvinceGetter = ({ province, district, setProvince, setDistrict, setWard, setWardSelected, setDistrictSelected }) => {
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
        setDistrictSelected(false);
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
        //dispatch(setWard(response.data.wards))
        setWard(normalizeText(response.data.wards));
      } catch (err) {
        handleApiCallError(err);
      }
    }

    if (district)
      fetchWards();
  }, [district])
}

export default ProvinceGetter