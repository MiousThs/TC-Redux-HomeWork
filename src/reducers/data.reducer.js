// unsuccessful:(
import { FETCH_DATA_BEGIN, FETCH_DATA_SUCCESS, FETCH_DATA_FAILURE } from '../actions/data.action';

const initState = {
    inCart: [],
    products: [],
    loading: false,
    error: null
};

export default function dataReducer(state=initState, action) {
    switch (action.type) {
        case FETCH_DATA_BEGIN:
            console.log('123');
            return {
                ...state,
                loading: true,
                error: null
            };

        case FETCH_DATA_SUCCESS:
            console.log(action.payload.products);
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