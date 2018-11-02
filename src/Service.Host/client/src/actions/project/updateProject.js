import * as actionTypes from '../';
import config from '../../config';
import { CALL_API } from 'redux-api-middleware';

export const updateProject = (projectId, name, startDate) => ({
    [CALL_API]: {
        endpoint: `${config.appRoot}/projects/${projectId}`,
        method: 'PUT',
        options: { requiresAuth: true },
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, startDate }),
        types: [
            {
                type: actionTypes.UPDATE_PROJECT_REQUESTED,
                payload: {
                    projectId,
                    data: { name, startDate }
                }
            },
            {
                type: actionTypes.UPDATE_PROJECT_SUCCEEDED,
                payload: async (action, state, res) => ({
                    projectId,
                    data: await res.json()
                })
            },
            {
                type: actionTypes.FETCH_ERROR,
                payload: (action, state, res) => ({
                    message: 'Failed to update project',
                    details: res
                        ? `${res.status} ${res.statusText}`
                        : `Network request failed`
                })
            }
        ]
    }
});
