// Handle call API error
const handleApiCallError = err => {
  if (err.response) {
    console.log(err.response.data)
    console.log(err.response.code)
    console.log(err.response.headers)
  } else {
    console.log('Error: ' + err.message)
  }
}

export default handleApiCallError
