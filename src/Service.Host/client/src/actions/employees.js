import * as actionTypes from './';
import config from '../config';
import { CALL_API } from 'redux-api-middleware';

export const fetchEmployee = employeeUrl => ({
    [CALL_API]: {
        endpoint: `${config.proxyRoot}${employeeUrl}`,
        method: 'GET',
        options: { requiresAuth: false },
        headers: {
            'Accept': 'application/json'
        },
        types: [
            {
                type: actionTypes.EMPLOYEE_REQUESTED,
                payload: { employeeUrl }
            },
            {
                type: actionTypes.EMPLOYEE_RECEIVED,
                payload: async (action, state, res) => ({
                    employeeUrl,
                    data: await res.json()
                })
            },
            {
                type: actionTypes.FETCH_ERROR,
                payload: (action, state, res) => ({
                    message: 'Failed to fetch employee',
                    details: res
                        ? `${res.status} ${res.statusText}`
                        : `Network request failed`
                })
            }
        ]
    }
});
