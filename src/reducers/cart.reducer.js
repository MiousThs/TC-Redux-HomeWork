import { ADD_ITEM_TO_CART, ADD_ONE_ITEM_TO_CART, REMOVE_ONE_ITEM_FROM_CART, REMOVE_FROM_CART } from '../actions/cart.actions';

const addItemToCart = (state, action) => {
  const isAlreadyIn = !(state.inCart.filter(e => e.name === action.target).length > 0);

  if (isAlreadyIn) {
    const item = state.products.filter(i => {
      return action.target === i.name;
    })[0];    
    const newState = state.inCart.slice();

    newState.push({
      name: item.name,
      price: item.price,
      amount: 1,
      total: item.price
    });

    return Object.assign({}, state, {inCart: newState});

  } else {
    const item = state.inCart.filter(e => e.name === action.target)[0];
    const newState = state.inCart.slice().filter(e => e.name !== action.target);

    newState.push({
      name: item.name,
      price: item.price,
      amount: item.amount + 1,
      total: item.price
    });

    return Object.assign({}, state, {inCart: newState});
  }
}

const addOneItemToCart = (state, action) => {
  const newState = state.inCart.filter(e => e.name !== action.target);
  const targetItem = state.inCart.filter(e => e.name === action.target)[0];

  newState.push({
    name: targetItem.name,
    price: targetItem.price,
    amount: targetItem.amount + 1,
    total: targetItem.total
  });

  return Object.assign({}, state, {inCart: newState});
}

const removeOneItemFromCart = (state, action) => {
  const newCart = state.inCart.filter(e => e.name !== action.target);
  const targetsItem = state.inCart.filter(e => e.name === action.target)[0];

  newCart.push({
    name: targetsItem.name,
    price: targetsItem.price,
    amount: targetsItem.amount - 1,
    total: targetsItem.total
  });
  
  return Object.assign({}, state, {inCart: newCart});
}

const removeFromCart = (state, action) => {
  const updatedCart = state.inCart.filter(e => e.name !== action.target);
  return Object.assign({}, state, {inCart: updatedCart});
}

export default (state, action) => {
    switch (action.type) {
        case ADD_ITEM_TO_CART:
          return addItemToCart(state, action);

        case ADD_ONE_ITEM_TO_CART:
          return addOneItemToCart(state, action);

        case REMOVE_ONE_ITEM_FROM_CART:
          return removeOneItemFromCart(state, action);

        case REMOVE_FROM_CART:
          return removeFromCart(state, action);

        default:
            return state;
    }
}