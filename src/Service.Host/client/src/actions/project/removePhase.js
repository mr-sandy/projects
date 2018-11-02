import * as actionTypes from '../';
import config from '../../config';
import { CALL_API } from 'redux-api-middleware';

export const removePhase = (projectId, phaseNumber) => ({
    [CALL_API]: {
        endpoint: `${config.appRoot}/projects/${projectId}/phases/${phaseNumber}`,
        method: 'DELETE',
        options: { requiresAuth: true },
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        types: [
            {
                type: actionTypes.REMOVE_PHASE_REQUESTED,
                payload: {
                    projectId,
                    data: { phaseNumber }
                }
            },
            {
                type: actionTypes.REMOVE_PHASE_SUCCEEDED,
                payload: async (action, state, res) => ({
                    projectId,
                    data: await res.json()
                })
            },
            {
                type: actionTypes.FETCH_ERROR,
                payload: (action, state, res) => ({
                    message: 'Failed to remove phase',
                    details: res
                        ? `${res.status} ${res.statusText}`
                        : `Network request failed`
                })
            }
        ]
    }
});
