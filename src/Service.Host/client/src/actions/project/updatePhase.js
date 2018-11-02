import * as actionTypes from '../';
import config from '../../config';
import { CALL_API } from 'redux-api-middleware';

export const updatePhase = (projectId, phaseNumber, status, endDate) => ({
    [CALL_API]: {
        endpoint: `${config.appRoot}/projects/${projectId}/phases/${phaseNumber}`,
        method: 'PUT',
        options: { requiresAuth: true },
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status, endDate }),
        types: [
            {
                type: actionTypes.UPDATE_PHASE_REQUESTED,
                payload: {
                    projectId,
                    data: { phaseNumber, status, endDate }
                }
            },
            {
                type: actionTypes.UPDATE_PHASE_SUCCEEDED,
                payload: async (action, state, res) => ({
                    projectId,
                    data: await res.json()
                })
            },
            {
                type: actionTypes.FETCH_ERROR,
                payload: (action, state, res) => ({
                    message: 'Failed to update phase',
                    details: res
                        ? `${res.status} ${res.statusText}`
                        : `Network request failed`
                })
            }
        ]
    }
});
