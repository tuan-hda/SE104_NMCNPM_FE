import axios from 'axios'

const appApi = axios.create({
  baseURL: 'http://hambursy-server.herokuapp.com/api/'
})

export default appApi