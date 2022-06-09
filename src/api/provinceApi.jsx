import axios from 'axios'

const provinceApi = axios.create({
  baseURL: 'https://provinces.open-api.vn/api/'
})

export default provinceApi
