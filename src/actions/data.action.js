function getData() {
    return fetch("products.json")
        .then(handleErrors)
        .then(res => {
            return res.json()
        })
        .then(json => {
            return(json)
        });
}

function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}

export function fetchData() {
    return dispatch => {
        dispatch(fetchDataBegin());
        return getData()
            .then(json => {
                dispatch(fetchDataSuccess(json.products));
                return json.products
            })
            .catch(e => dispatch(fetchDataFailure(e)));
    };
}

export const FETCH_DATA_BEGIN = 'FETCH_DATA_BEGIN';
export const FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS';
export const FETCH_DATA_FAILURE = 'FETCH_DATA_FAILURE';

export const fetchDataBegin = () => ({
    type: FETCH_DATA_BEGIN
});
export const fetchDataSuccess = products => ({
    type: FETCH_DATA_SUCCESS,
    payload: {products}
});
export const fetchDataFailure = error => ({
    type: FETCH_DATA_FAILURE,
    payload: {error}
})