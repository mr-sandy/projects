import * as actionTypes from './';
import { postJson } from '../helpers/json';
import config from '../config' ;
import { CALL_API } from 'redux-api-middleware';

export const receiveProject = project => ({
    type: actionTypes.RECEIVE_PROJECT,
    payload: project
});

export const createProject = name => ({
    [CALL_API]: {
        endpoint: `${config.appRoot}/projects/`,
        method: 'POST',
        options: { requiresAuth: true },
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name }),
        types: [
            {
                type: actionTypes.CREATE_PROJECT,
                payload: { name }
            },
            {
                type: actionTypes.PROJECT_CREATED,
                payload: async (action, state, res) => await res.json()
            },
            {
                type: actionTypes.FETCH_ERROR,
                payload: (action, state, res) => res ? `Projects - ${res.status} ${res.statusText}` : `Network request failed`
            }
        ]
    }
});

export const fetchProject = projectId => ({
    [CALL_API]: {
        endpoint: `${config.appRoot}/projects/${projectId}`,
        method: 'GET',
        options: { requiresAuth: true },
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        types: [
            {
                type: actionTypes.REQUEST_PROJECT,
                payload: { projectId }
            },
            {
                type: actionTypes.RECEIVE_PROJECT,
                payload: async (action, state, res) => await res.json()
            },
            {
                type: actionTypes.FETCH_ERROR,
                payload: (action, state, res) => res ? `Projects - ${res.status} ${res.statusText}` : `Network request failed`
            }
        ]
    }
});

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
                type: actionTypes.REQUEST_PROJECTS,
                payload: { name }
            },
            {
                type: actionTypes.RECEIVE_PROJECTS,
                payload: async (action, state, res) => await res.json()
            },
            {
                type: actionTypes.FETCH_ERROR,
                payload: (action, state, res) => res ? `Projects - ${res.status} ${res.statusText}` : `Network request failed`
            }
        ]
    }
});
