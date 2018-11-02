import * as actionTypes from '../../actions';

const defaultState = {
    inError: false,
    message: null,
    details: null
}

const error = (prevState = defaultState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_ERROR:
            return {
                inError: true,
                message: action.payload.message,
                details: action.payload.details
            }

        default:
            return prevState;
    }
}

export default error;