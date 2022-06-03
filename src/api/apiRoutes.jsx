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
export const getSignupHeader = token => ({
  headers: {
    Authorization: 'Bearer ' + token
  }
})

// GET PROFILE
export const GET_PROFILE = 'get-all-users'
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

// GET FEATURED ITEM
export const GET_FEATURED_ITEM = 'get-featured-item'

// ADD ITEM TO CART
export const ADD_ITEM_TO_CART = 'add-item-to-cart'
export const getAddCartBody = (itemID, number) => ({
  itemID: itemID,
  number: number
})

//DISPLAY CART ITEM
export const DISPLAY_CART_ITEM = 'display-cart'
