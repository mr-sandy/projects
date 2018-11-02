import * as actionTypes from '../actions';
import { fetchProjectActivities } from '../actions/project';

export const refreshProject = ({ dispatch }) => next => action => {
    switch (action.type) {
        case actionTypes.UPDATE_PROJECT_SUCCEEDED:
        case actionTypes.UPDATE_PHASE_SUCCEEDED:
        case actionTypes.REMOVE_PHASE_SUCCEEDED:
        case actionTypes.ADD_PHASE_SUCCEEDED:
            dispatch(fetchProjectActivities(action.payload.projectId));
            break;
    }

    return next(action);
}