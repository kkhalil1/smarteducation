import { ADD_TO_CART, REMOVE_FROM_CART, CLEAR_CART } from '../../constants/actionTypes'

const addToCart = (product) => {
  return {
    type: ADD_TO_CART,
    payload: product,
  }
}

const removeFromCart = (product) => {
  return {
    type: REMOVE_FROM_CART,
    payload: product,
  }
}

const clearCart = () => ({
  type: CLEAR_CART,
})

export { addToCart, removeFromCart, clearCart }
