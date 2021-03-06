export const validateInfo = value => {
  let error = {}

  // Email validation
  if (!value.email) {
    error.email = 'Email required.'
  } else if (
    !String(value.email).match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
  ) {
    error.email = 'Email is invalid.'
  }

  // Name validation
  if (!value.name) {
    error.name = 'Name required.'
  }

  // Password validation
  if (!value.password) {
    error.password = ['Password required.']
  } else {
    const password = String(value.password)

    error.password = []

    if (password.length < 8)
      error.password = [
        ...error.password,
        'Must contain at least 8 characters.'
      ]

    if (!/^(?=.*[0-9])/.test(password))
      error.password = [...error.password, 'Must contain at least one number.']

    if (!/^(?=.*[A-Z])/.test(password))
      error.password = [
        ...error.password,
        'Must contain at least one uppercase character.'
      ]

    if (!/^(?=.*[a-z])/.test(password))
      error.password = [
        ...error.password,
        'Must contain at least one lowercase character.'
      ]
  }

  // Confirm password validation
  if (!value.confirmPassword) error.confirmPassword = 'Password required.'
  else if (value.confirmPassword !== value.password)
    error.confirmPassword = 'Your password do not match'

  // Old password validation
  if (!value.oldPassword) error.oldPassword = 'Old password required.'

  return error
}

// VALIDATE PHONE
export const validatePhone = value => {
  let error
  if (value && value.length < 10) {
    error = 'At least 10 numbers.'
  }
  return error
}

// VALIDATE DELIVERY INFO

export const validateDeliveryInfo = value => {
  let error = validateAddAddress(value)
  return error
}

export const validateAddAddress = value => {
  let error = {}
  if (!value.name) {
    error.name = 'Name required.'
  }

  if (!value.phone) {
    error.phone = 'Phone required.'
  } else if (value.phone.length < 10) {
    error.phone = 'At least 10 numbers.'
  }

  if (!value.address) {
    error.address = 'Address required.'
  }

  if (!value.province || value.province === 'default') {
    error.province = 'Province required.'
  }

  if (!value.district || value.district === 'default') {
    error.district = 'District required.'
  }

  if (!value.ward || value.ward === 'default') {
    error.ward = 'Ward required.'
  }

  return error
}
