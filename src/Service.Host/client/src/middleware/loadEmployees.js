import * as actionTypes from '../actions';
import { fetchEmployee } from '../actions/employees';
import { getEmployeesToFetch } from '../selectors/employees';

export const loadEmployees = ({ dispatch, getState }) => next => action => {
    switch (action.type) {
        case actionTypes.PROJECT_ACTIVITIES_RECEIVED:
            {
                const employeesToFetch = getEmployeesToFetch(getState(), action.payload.data);
                employeesToFetch.map(employeeUrl => dispatch(fetchEmployee(employeeUrl)))
                break;
            }
    }

    return next(action);
}