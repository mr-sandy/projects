import * as actionTypes from '../';
import config from '../../config';
import { CALL_API } from 'redux-api-middleware';

export const createProject = (name, phases, startDate) => ({
    [CALL_API]: {
        endpoint: `${config.appRoot}/projects?phases=${phases}`,
        method: 'POST',
        options: { requiresAuth: true },
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, startDate }),
        types: [
            {
                type: actionTypes.CREATE_PROJECT_REQUESTED,
                payload: { name }
            },
            {
                type: actionTypes.CREATE_PROJECT_SUCCEEDED,
                payload: async (action, state, res) => await res.json()
            },
            {
                type: actionTypes.FETCH_ERROR,
                payload: (action, state, res) => ({
                    message: 'Failed to create project',
                    details: res
                        ? `${res.status} ${res.statusText}`
                        : `Network request failed`
                })
            }
        ]
    }
});
