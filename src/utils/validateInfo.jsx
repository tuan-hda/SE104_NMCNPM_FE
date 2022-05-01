export const validateInfo = (value) => {
  let error = {}

  // Email validation
  if (!value.email) {
    error.email = 'Email required.'
  } else if (!String(value.email)
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )) {
    error.email = 'Email is invalid.'
  }

  // Name validation
  if (!value.name) {
    error.name = 'Name required.'
  }

  // Password validation
  if (!value.password) {
    error.password = 'Password required.'
  } else {
    const password = String(value.password);

    error.password = []

    if (password.length < 8)
      error.password = [...error.password, 'Must contain at least 8 characters.'];

    if (/^[a-zA-Z]+$/.test(password))
      error.password = [...error.password, 'Must contain at least one number.'];

    if (!isNaN(password))
      error.password = [...error.password, 'Must contain at least one letter.'];
  }

  // Confirm password validation
  if (!value.confirmPassword)
    error.confirmPassword = 'Password required.'
  else if (value.confirmPassword !== value.password)
    error.confirmPassword = 'Your password do not match'

  // Old password validation
  if (!value.oldPassword)
    error.oldPassword = 'Old password required.'

  return error
}
