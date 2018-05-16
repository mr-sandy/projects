import * as actionTypes from './';
import { postJson } from '../helpers/json';
import config from '../config' ;

export const receiveProject = project => ({
    type: actionTypes.RECEIVE_PROJECT,
    payload: project
});

export const createProject = (name, history) => async dispatch => {
    try {
        const body = { name };

        const project = await postJson(`${config.appRoot}/projects/`, body);

        dispatch(receiveProject(project));

        history.push(`/projects/${project.id}`);
    } catch (e) {
        alert(`Failed to create project. Error: ${e.message}`);
    }
};