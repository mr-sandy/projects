import { CALL_API } from 'redux-api-middleware';
import { getAccessToken } from '../selectors/user';

export const authorisation = ({ getState }) => next => action => {
    if (action[CALL_API]) {
        if (action[CALL_API].options && action[CALL_API].options.requiresAuth) {
            action[CALL_API].headers = {
                Authorization: 'Bearer ' + getAccessToken(getState()),
                ...action[CALL_API].headers
            };
        }
    }

    return next(action);
};