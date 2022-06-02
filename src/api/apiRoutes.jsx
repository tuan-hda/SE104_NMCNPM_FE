// GET ITEM
export const GET_ITEM = 'get-item'
export const getItemParams = (id) => ({
  params: {
    id: id
  }
})

// GET RESTAURANT
export const GET_RESTAURANT = 'get-restaurant'
export const getRestaurantParams = id => ({
  params: {
    id: id
  }
})

// SEARCH ITEM
export const SEARCH_ITEM = 'search-item'
export const getSearchBody = searchName => ({
  params: {
    search: searchName
  }
})

// SIGN UP
export const SIGN_UP = 'create-new-user'
export const getSignupBody = (email, name) => ({
  email: email,
  name: name
})
export const getAccessTokenHeader = token => ({
  headers: {
    Authorization: 'Bearer ' + token
  }
})

// GET PROFILE
export const GET_PROFILE = 'get-user'
export const getProfileId = id => ({
  params: {
    id: id
  }
})

// EDIT PROFILE
export const EDIT_PROFILE = 'edit-user'
export const getEditProfileBody = (id, name, dob, phoneNumber, gender, avatar, detail, province, district, ward) => ({
  id: id,
  name: name,
  dob: dob,
  phoneNumber: phoneNumber,
  gender: gender,
  avatar: avatar,
  detail: detail,
  province: province,
  district: district,
  ward: ward
})


// GET ADDRESSES
export const GET_ADDRESSES = 'get-address'
export const getAddressParams = id => ({
  params: {
    userId: id
  }
})

// ADD ADDRESS
export const ADD_ADDRESS = 'add-address'
export const getAddAddressBody = (detail, province, district, ward, name, phoneNumber) => ({
  detail: detail,
  province: province,
  district: district,
  ward: ward,
  name: name,
  phoneNumber: phoneNumber
})

// PURCHASE
export const PURCHASE = 'purchase'
export const getPurchaseBody = (payment, phoneNumber, address, province, district, ward, note) => ({
  payment: payment,
  phoneNumber: phoneNumber,
  address: address,
  province: province,
  district: district,
  ward: ward,
  note: note
})