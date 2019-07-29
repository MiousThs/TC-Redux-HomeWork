export const GET_PRODUCT_LIST = 'GET_PRODUCT_LIST';
export const ADD_NEW_PRODUCT = 'ADD_NEW_PRODUCT';
export const SORT_BY_NAME = 'SORT_BY_NAME';
export const SORT_BY_PRICE = 'SORT_BY_PRICE';
export const SORT_BY_AVAILABILITY = 'SORT_BY_AVAILABILITY';

export const getProductList = () => ({type: GET_PRODUCT_LIST});
export const addNewProduct = payload => ({type: ADD_NEW_PRODUCT, product: payload});
export const sortByName = () => ({type: SORT_BY_NAME});
export const sortByPrice = () => ({type: SORT_BY_PRICE});
export const sortByAvailability = () => ({type: SORT_BY_AVAILABILITY});