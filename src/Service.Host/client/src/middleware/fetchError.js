import * as actionTypes from '../actions';

export const fetchError = ({ dispatch, getState }) => next => action => {
    const result = next(action);
    //if (action.error) {
    //    alert(`Failed to fetch ${action.payload}`);
    //}

    switch (action.type) {
        case actionTypes.FETCH_ERROR:
            alert(`Failed to fetch ${action.payload}`);
            break;
    }

    return result;
}