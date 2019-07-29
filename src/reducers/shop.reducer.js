import {GET_CART_ITEMS, ADD_ITEM_TO_CART, ADD_ONE_ITEM_TO_CART, REMOVE_ONE_ITEM_FROM_CART, REMOVE_FROM_CART} from '../actions/cart.actions';
import {GET_PRODUCT_LIST, ADD_NEW_PRODUCT, SORT_BY_NAME, SORT_BY_PRICE,SORT_BY_AVAILABILITY} from '../actions/products.action';
import cartReducer from './cart.reducer';
import { FETCH_DATA_BEGIN, FETCH_DATA_SUCCESS, FETCH_DATA_FAILURE } from '../actions/data.action';

// const initState = {
//   inCart: [],
//   products: [
//     {
//       name: 'iPhone 4s',
//       price: 200,
//       available: 2
//     },
//     {
//       name: 'Nokia 2110',
//       price: 600,
//       available: 0
//     },
//     {
//       name: 'Samsung s3',
//       price: 345,
//       available: 2
//     },
//     {
//       name: 'LG G2',
//       price: 90,
//       available: 1
//     },
//     {
//       name: 'Nokia 9930',
//       price: 250,
//       available: 3
//     },
//     {
//       name: 'iPhone X',
//       price: 123,
//       available: 4
//     },
//     {
//       name: 'Meizu m9',
//       price: 656,
//       available: 23
//     },
//     {
//       name: 'Sonny 9',
//       price: 564,
//       available: 234
//     },
//     {
//       name: 'iPhone 6 plus',
//       price: 434,
//       available: 7
//     },
//     {
//       name: 'Alcatel noname',
//       price: 123,
//       available: 7
//     }
//   ]
// };

const initState = {
  inCart: [],
  products: [],
  loading: false,
  error: null
};

const returnNewProductState = (state, action) => {
  let newState = state.products.slice();

  newState.push({
    name: action.product.name,
    price: action.product.price,
    available: action.product.available
  });

  return newState;
}

const addItemToCart = (state, action) => {
  let target = state.products.filter(i => {
    return action.target === i.name;
  })[0];

  if (target.available > 0) {
    target = Object.assign({}, target, {available: target.available - 1});
    const productsState = state.products.filter(i => {
      return target.name !== i.name;
    });
    productsState.push(target);
    const inCartState = cartReducer(state, action);
    
    return sortByName(Object.assign({}, {products: productsState}, {inCart: inCartState.inCart}), action);
  }

  return sortByName(state, action);
}

const addOneItemToCart = (state, action) => {
  const productsState = state.products.filter(e => e.name !== action.target);
  const targetItem = state.products.filter(e => e.name === action.target)[0];

  productsState.push({
    name: targetItem.name,
    price: targetItem.price,
    available: targetItem.available - 1
  });
  const inCartState = cartReducer(state, action);

  return sortCartByName(sortByName(Object.assign({}, {products: productsState}, {inCart: inCartState.inCart}), action), action);
}

const removeOneItemFromCart = (state, action) => {
  const productState = state.products.filter(e => e.name !== action.target);
  const targetsItem = state.products.filter(e => e.name === action.target)[0];

  productState.push({
    name: targetsItem.name,
    price: targetsItem.price,
    available: targetsItem.available + 1
  });
  const inCartsState = cartReducer(state, action);

  return sortCartByName(Object.assign({}, {products: productState}, {inCart: inCartsState.inCart}), action);
}

const removeFromCart = (state, action) => {
  const stateProduct = state.products.filter(e => e.name !== action.target);
  const updatedItem = state.products.filter(e => e.name === action.target)[0];
  const itemInCart = state.inCart.filter(e => e.name === action.target)[0];

  stateProduct.push({
    ...updatedItem,
    available: (updatedItem.available + itemInCart.amount)
  });

  return Object.assign({}, {products: stateProduct}, {inCart: cartReducer(state, action).inCart});
}

const sortByName = (state, action) => {
  let unsortedState = state.products.slice().sort((a, b) => {
    return (a.name.toLowerCase() < b.name.toLowerCase()) ? -1 :
      (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : 0
  });

  return Object.assign({}, state, {products: unsortedState});
}

const sortByPrice = (state, action) => {
  const unsortedProducts = state.products.slice().sort((a, b) => {return a.price - b.price})
  return Object.assign({}, state, {products: unsortedProducts});
}

const sortByAvailability = (state, action) => {
  const unsortedProds = state.products.slice().sort((a, b) => {return b.available - a.available});
  return Object.assign({}, state, {products: unsortedProds});
}

const sortCartByName = (state, action) => {
  let unsortedCart = state.inCart.slice().sort((a, b) => {
    return (a.name.toLowerCase() < b.name.toLowerCase()) ? -1 :
      (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : 0
  });

  return Object.assign({}, state, {inCart: unsortedCart});
}

export default (state = initState, action) => {
  switch (action.type) {
    case GET_CART_ITEMS:
      return state.inCart;

    case GET_PRODUCT_LIST:
      return state.products;

    case ADD_NEW_PRODUCT:
      return Object.assign({}, state, {products: returnNewProductState(state, action)});

    case ADD_ITEM_TO_CART:
      return addItemToCart(state, action);

    case ADD_ONE_ITEM_TO_CART:
      return addOneItemToCart(state, action);

    case REMOVE_ONE_ITEM_FROM_CART:
      return removeOneItemFromCart(state, action);

    case REMOVE_FROM_CART:
      return removeFromCart(state, action);

    case SORT_BY_NAME:
      return sortByName(state, action);

    case SORT_BY_PRICE:
      return sortByPrice(state, action);

    case SORT_BY_AVAILABILITY:
      return sortByAvailability(state, action);

    case FETCH_DATA_BEGIN:
        return {
            ...state,
            loading: true,
            error: null
        };

    case FETCH_DATA_SUCCESS:
        return {
            ...state,
            loading: false,
            products: action.payload.products
        };

    case FETCH_DATA_FAILURE:
        return {
            ...state,
            loading: false,
            error: action.payload.error,
            products: []
        };

    default:
      return state;
  }
}

