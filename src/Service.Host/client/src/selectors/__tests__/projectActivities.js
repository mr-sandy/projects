import { getProjectActivitiesLoading, getProjectActivitiesUpdating, getProjectActivities } from '../projectActivities';

describe('when getting project activities loading', () => {
    test('should return true if the project activities are loading', () => {

        const state = {
            projectActivities: [
                {
                    projectId: 2,
                    loading: true,
                    items: []
                }
            ]
        };

        const expectedResult = true;

        expect(getProjectActivitiesLoading(state, 2)).toEqual(expectedResult);
    });

    test('should return false if the project activites are not', () => {


        const state = {
            projectActivities: [
                {
                    projectId: 2,
                    loading: false,
                    items: []
                }
            ]
        }; const expectedResult = false;

        expect(getProjectActivitiesLoading(state, 2)).toEqual(expectedResult);
    });
});

describe('when getting project activities updating', () => {
    test('should return true if the project activities are updating', () => {

        const state = {
            projectActivities: [
                {
                    projectId: 2,
                    loading: false,
                    updating: true,
                    items: []
                }
            ]
        };

        const expectedResult = true;

        expect(getProjectActivitiesUpdating(state, 2)).toEqual(expectedResult);
    });

    test('should return false if the project activites are not', () => {

        const state = {
            projectActivities: [
                {
                    projectId: 2,
                    loading: false,
                    updating: false,
                    items: []
                }
            ]
        };

        const expectedResult = false;

        expect(getProjectActivitiesUpdating(state, 2)).toEqual(expectedResult);
    });
});

describe('when getting project activities', () => {
    test('should get the activities for the specified project', () => {

        const state = {
            projectActivities: [
                {
                    projectId: 1,
                    loading: false,
                    updating: false,
                    items: [
                        { type: 'create', activityDate: '2018-18-07', employeeUrl: '/employees/2' }
                    ]
                },
                {
                    projectId: 2,
                    loading: false,
                    updating: false,
                    items: [
                        { type: 'create', activityDate: '2018-18-07', employeeUrl: '/employees/2' },
                        { type: 'update', activityDate: '2018-18-08', employeeUrl: '/employees/2' },
                        { type: 'add-phase', activityDate: '2018-18-09', employeeUrl: '/employees/2' }
                    ]
                },
                {
                    projectId: 3,
                    loading: false,
                    updating: false,
                    items: [
                        { type: 'create', activityDate: '2018-18-07', employeeUrl: '/employees/2' }
                    ]
                }
            ],
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
        };

        const expectedResult = [
            {
                type: 'create',
                index: 0,
                activityDate: '2018-18-07',
                employeeUrl: '/employees/2',
                employee: {
                    name: 'Mr Badger'
                }
            },
            {
                type: 'update',
                index: 1,
                activityDate: '2018-18-08',
                employeeUrl: '/employees/2',
                employee: {
                    name: 'Mr Badger'
                }},
            {
                type: 'add-phase',
                index: 2,
                activityDate: '2018-18-09',
                employeeUrl: '/employees/2',
                employee: {
                    name: 'Mr Badger'
                }}
        ];

        expect(getProjectActivities(state, 2)).toEqual(expectedResult);
    });

    test('should return null when the project activities are loading', () => {

        const state = {
            projectActivities: [
                {
                    projectId: 1,
                    loading: false,
                    updating: false,
                    items: [
                        { type: 'create', activityDate: '2018-18-07' }
                    ]
                },
                {
                    projectId: 2,
                    loading: true,
                    updating: false,
                    items: []
                },
                {
                    projectId: 3,
                    loading: false,
                    updating: false,
                    items: [
                        { type: 'create', activityDate: '2018-18-07' }
                    ]
                }
            ],
            employees: [
            ]
        };

        expect(getProjectActivities(state, 2)).toBeNull();
    });
});
