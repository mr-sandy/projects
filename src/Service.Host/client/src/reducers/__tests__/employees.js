import employees from '../employees';
import * as actionTypes from '../../actions';

describe('when requesting an employee', () => {
    test('a new entry should be created with loading set to true', () => {

        const state = [
            {
                employeeUrl: '/employees/2',
                item: {
                    name: 'Mr Badger'
                }
            }
        ];

        const action = {
            type: actionTypes.EMPLOYEE_REQUESTED,
            payload: { employeeUrl: '/employees/1'}
        };

        const expectedState = [
            {
                employeeUrl: '/employees/2',
                item: {
                    name: 'Mr Badger'
                }
            },
            {
                employeeUrl: '/employees/1',
                loading: true,
                item: null
            }
        ];

        expect(employees(state, action)).toEqual(expectedState);
    });
});

describe('when receiving an employee', () => {
    test('a should update the enrty and set loading to false', () => {

        const state = [
            {
                employeeUrl: '/employees/2',
                item: {
                    name: 'Mr Badger'
                }
            },
            {
                employeeUrl: '/employees/1',
                loading: true,
                item: null
            }
        ];

        const action = {
            type: actionTypes.EMPLOYEE_RECEIVED,
            payload: {
                employeeUrl: '/employees/1',
                data: {
                    name: 'Mrs Weasel'
                }
            }
        };

        const expectedState = [
            {
                employeeUrl: '/employees/2',
                item: {
                    name: 'Mr Badger'
                }
            },
            {
                employeeUrl: '/employees/1',
                loading: false,
                item: {
                    name: 'Mrs Weasel'
                }
            }
        ];

        expect(employees(state, action)).toEqual(expectedState);
    });
});
