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