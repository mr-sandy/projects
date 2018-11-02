import * as actionTypes from '../';
import config from '../../config';
import { CALL_API } from 'redux-api-middleware';

export const deleteProject = projectId => ({
    [CALL_API]: {
        endpoint: `${config.appRoot}/projects/${projectId}`,
        method: 'DELETE',
        options: { requiresAuth: true },
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        types: [
            {
                type: actionTypes.DELETE_PROJECT_REQUESTED,
                payload: { projectId }
            },
            {
                type: actionTypes.DELETE_PROJECT_SUCCEEDED,
                payload: async (action, state, res) => ({
                    projectId,
                    data: await res.json()
                })
            },
            {
                type: actionTypes.FETCH_ERROR,
                payload: (action, state, res) => ({
                    message: 'Failed to delete project',
                    details: res
                        ? `${res.status} ${res.statusText}`
                        : `Network request failed`
                })
            }
        ]
    }
});
