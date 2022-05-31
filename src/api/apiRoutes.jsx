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