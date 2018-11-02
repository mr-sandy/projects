import { getEmployeesToFetch, getEmployee, getEmployeesLoading } from '../employees';

describe('when selecting employees to fetch', () => {
    test('should return distinct values', () => {

        const state = {
            employees: []
        }

        const activities = [
            {
                type: 'add-phase',
                employeeUrl: '/employees/2'
            },
            {
                type: 'update-phase',
                employeeUrl: '/employees/2'
            },
            {
                type: 'update',
                employeeUrl: '/employees/1'
            },
            {
                type: 'create',
                employeeUrl: '/employees/1'
            }
        ];

        const expectedResult = ['/employees/1', '/employees/2'].sort();

        expect(getEmployeesToFetch(state, activities).sort()).toEqual(expectedResult);
    });

    test('should return only values not already in state', () => {

        const state = {
            employees: [
                {
                    employeeUrl: '/employees/2',
                    data: {
                        name: 'Mr Badger'
                    }
                }
            ]
        }

        const activities = [
            {
                type: 'add-phase',
                employeeUrl: '/employees/2'
            },
            {
                type: 'update-phase',
                employeeUrl: '/employees/2'
            },
            {
                type: 'update',
                employeeUrl: '/employees/1'
            },
            {
                type: 'create',
                employeeUrl: '/employees/1'
            }
        ];

        const expectedResult = ['/employees/1'];

        expect(getEmployeesToFetch(state, activities)).toEqual(expectedResult);
    });

    test('should return an empty list if all values already in state', () => {

        const state = {
            employees: [
                {
                    employeeUrl: '/employees/1',
                    data: {
                        name: 'Mrs Weasel'
                    }
                },
                {
                    employeeUrl: '/employees/2',
                    data: {
                        name: 'Mr Badger'
                    }
                }
            ]
        }

        const activities = [
            {
                type: 'add-phase',
                employeeUrl: '/employees/2'
            },
            {
                type: 'update-phase',
                employeeUrl: '/employees/2'
            },
            {
                type: 'update',
                employeeUrl: '/employees/1'
            },
            {
                type: 'create',
                employeeUrl: '/employees/1'
            }
        ];

        const expectedResult = [];

        expect(getEmployeesToFetch(state, activities)).toEqual(expectedResult);
    });

});

describe('when getting an employee', () => {
    test('should return null if no matching entry exists', () => {

        const state = {
            employees: []
        }

        const employeeUrl = '/employees/1';

        const expectedResult = null;

        expect(getEmployee(state, employeeUrl)).toEqual(expectedResult);
    });

    test('should return the employee data if a matching entry exists', () => {

        const state = {
            employees: [
                {
                    employeeUrl: '/employees/2',
                    loading: false,
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
                }]
        }

        const employeeUrl = '/employees/1';

        const expectedResult = {
            name: 'Mrs Weasel'
        };

        expect(getEmployee(state, employeeUrl)).toEqual(expectedResult);
    });
});

describe('when getting employees loading', () => {
    test('should return false if there are no entries', () => {

        const state = {
            employees: []
        }

        expect(getEmployeesLoading(state)).toEqual(false);
    });

    test('should return false if no entries are loading', () => {

        const state = {
            employees: [
                {
                    employeeUrl: '/employees/2',
                    loading: false,
                    item: {
                        name: 'Mr Badger'
                    }
                },
                {
                    employeeUrl: '/employees/1',
                    loading: false,
                    item: null
                }
            ]
        }

        expect(getEmployeesLoading(state)).toEqual(false);
    });

    test('should return true if any entries are loading', () => {

        const state = {
            employees: [
                {
                    employeeUrl: '/employees/2',
                    loading: false,
                    item: {
                        name: 'Mr Badger'
                    }
                },
                {
                    employeeUrl: '/employees/1',
                    loading: true,
                    item: null
                }]
        }

        expect(getEmployeesLoading(state)).toEqual(true);
    });
});
