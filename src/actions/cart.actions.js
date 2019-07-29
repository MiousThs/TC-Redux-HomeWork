export const GET_CART_ITEMS = 'GET_CART_ITEMS';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const ADD_ITEM_TO_CART = 'ADD_ITEM_TO_CART';
export const ADD_ONE_ITEM_TO_CART = 'ADD_ONE_ITEM_TO_CART';
export const REMOVE_ONE_ITEM_FROM_CART = 'REMOVE_ONE_ITEM_FROM_CART';

export const getCartItems = () => ({type: GET_CART_ITEMS});
export const removeFromCart = target => ({
    type: REMOVE_FROM_CART, 
    target: target
});
export const addItemToCart = name => ({
    type: ADD_ITEM_TO_CART,
    target: name
});
export const  addOneItemToCart = target => ({
    type: ADD_ONE_ITEM_TO_CART,
    target: target
});
export const removeOneItemFromCart = target => ({
    type: REMOVE_ONE_ITEM_FROM_CART,
    target: target
});