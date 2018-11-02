import * as actionTypes from '../';
import config from '../../config';
import { CALL_API } from 'redux-api-middleware';
import { getProjectsLoaded, getProjectsLoading } from '../../selectors/projects';

export const fetchProjectsIfRequired = () => (dispatch, getState) => {
    var state = getState();
    if (!getProjectsLoaded(state) && !getProjectsLoading(state)) {
        dispatch(fetchProjects());
    }
};

export const fetchProjects = () => ({
    [CALL_API]: {
        endpoint: `${config.appRoot}/projects`,
        method: 'GET',
        options: { requiresAuth: true },
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        types: [
            {
                type: actionTypes.PROJECTS_REQUESTED,
                payload: {}
            },
            {
                type: actionTypes.PROJECTS_RECEIVED,
                payload: async (action, state, res) => await res.json()
            },
            {
                type: actionTypes.FETCH_ERROR,
                payload: (action, state, res) => ({
                    message: 'Failed to fetch projects',
                    details: res
                        ? `${res.status} ${res.statusText}`
                        : `Network request failed`
                })
            }
        ]
    }
});
