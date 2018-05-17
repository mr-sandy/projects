import * as actionTypes from '../actions';
import history from '../helpers/history';

export const navigation = ({ dispatch, getState }) => next => action => {
    const result = next(action);

    switch (action.type) {
        case actionTypes.PROJECT_CREATED:
            history.push(`/projects/${action.payload.id}`);
            break;
    }

    return result;
}