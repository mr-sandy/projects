import * as actionTypes from '../';
import config from '../../config';
import { CALL_API } from 'redux-api-middleware';

export const fetchProjectActivities = projectId => ({
    [CALL_API]: {
        endpoint: `${config.appRoot}/projects/${projectId}/activities`,
        method: 'GET',
        options: { requiresAuth: true },
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        types: [
            {
                type: actionTypes.PROJECT_ACTIVITIES_REQUESTED,
                payload: { projectId }
            },
            {
                type: actionTypes.PROJECT_ACTIVITIES_RECEIVED,
                payload: async (action, state, res) => ({
                    projectId,
                    data: await res.json()
                })
            },
            {
                type: actionTypes.FETCH_ERROR,
                payload: (action, state, res) => ({
                    message: 'Failed to fetch project activities',
                    details: res
                        ? `${res.status} ${res.statusText}`
                        : `Network request failed`
                })
            }
        ]
    }
});
