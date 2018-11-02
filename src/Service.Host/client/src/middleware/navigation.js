import * as actionTypes from '../actions';
import history from '../helpers/history';

export const navigation = ({ dispatch, getState }) => next => action => {
    const result = next(action);

    switch (action.type) {
        case actionTypes.CREATE_PROJECT_SUCCEEDED:
            history.push(`/projects/${action.payload.id}`);
            break;

        case actionTypes.DELETE_PROJECT_REQUESTED:
            history.push(`/projects`);
            break;
    }

    return result;
}