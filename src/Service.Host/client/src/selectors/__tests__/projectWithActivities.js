import { getProjectWithActivities, getProjectWithActivitiesLoading, getProjectWithActivitiesUpdating } from '../projectWithActivities';

describe('when getting project with activities loading', () => {
    test('should return true if the projects are loading', () => {

        const state = {
            projects: {
                loaded: false,
                loading: true,
                items: [
                ]
            },
            projectActivities: [
                {
                    projectId: 2,
                    loading: false,
                    items: [
                        { type: 'create', activityDate: '2018-18-07' }
                    ]
                }]
        }

        const expectedResult = true;

        expect(getProjectWithActivitiesLoading(state, 2)).toEqual(expectedResult);
    });

    test('should return true if the activities are loading', () => {

        const state = {
            projects: {
                loaded: true,
                loading: false,
                items: [
                    {
                        id: 1,
                        name: 'project 1',
                        updating: false
                    },
                    {
                        id: 2,
                        name: 'project 2',
                        updating: false
                    }
                ]
            },
            projectActivities: [
                {
                    projectId: 2,
                    loading: true,
                    items: [
                        { type: 'create', activityDate: '2018-18-07' }
                    ]
                }]
        }

        const expectedResult = true;

        expect(getProjectWithActivitiesLoading(state, 2)).toEqual(expectedResult);
    });

    test('should return false if neither the project not the activities are loading', () => {

        const state = {
            projects: {
                loaded: true,
                loading: false,
                items: [
                    {
                        id: 1,
                        name: 'project 1',
                        updating: false
                    },
                    {
                        id: 2,
                        name: 'project 2',
                        updating: false
                    }
                ]
            },
            projectActivities: [
                {
                    projectId: 2,
                    loading: false,
                    items: [
                        { type: 'create', activityDate: '2018-18-07' }
                    ]
                }]
        }

        const expectedResult = false;

        expect(getProjectWithActivitiesLoading(state, 2)).toEqual(expectedResult);
    });
});

describe('when getting project with activities updating', () => {
    test('should return true if the project is updating', () => {

        const state = {
            projects: {
                loaded: true,
                updating: false,
                items: [
                    {
                        id: 1,
                        name: 'project 1',
                        updating: false
                    },
                    {
                        id: 2,
                        name: 'project 2',
                        updating: true
                    }
                ]
            },
            projectActivities: [
                {
                    projectId: 2,
                    updating: false,
                    items: [
                        { type: 'create', activityDate: '2018-18-07' }
                    ]
                }]
        }


        const expectedResult = true;

        expect(getProjectWithActivitiesUpdating(state, 2)).toEqual(expectedResult);
    });

    test('should return true if the activities are updating', () => {

        const state = {
            projects: {
                loaded: true,
                loading: false,
                items: [
                    {
                        id: 1,
                        name: 'project 1',
                        updating: false
                    },
                    {
                        id: 2,
                        name: 'project 2',
                        updating: false
                    }
                ]
            },
            projectActivities: [
                {
                    projectId: 2,
                    loading: false,
                    updating: true,
                    items: [
                        { type: 'create', activityDate: '2018-18-07' }
                    ]
                }]
        }

        const expectedResult = true;

        expect(getProjectWithActivitiesUpdating(state, 2)).toEqual(expectedResult);
    });

    test('should return false if neither the project not the activities are updating', () => {

        const state = {
            projects: {
                loaded: true,
                loading: false,
                items: [
                    {
                        id: 1,
                        name: 'project 1',
                        updating: false
                    },
                    {
                        id: 2,
                        name: 'project 2',
                        updating: false
                    }
                ]
            },
            projectActivities: [
                {
                    projectId: 2,
                    loading: false,
                    updating: false,
                    items: [
                        { type: 'create', activityDate: '2018-18-07' }
                    ]
                }]
        }

        const expectedResult = false;

        expect(getProjectWithActivitiesUpdating(state, 2)).toEqual(expectedResult);
    });
});

describe('when getting a project with activities', () => {
    test('should get the specified project and activities', () => {

        const state = {
            projects: {
                items: [
                    {
                        id: 1,
                        name: 'project 1'
                    },
                    {
                        id: 2,
                        name: 'project 2'
                    }
                ]
            },
            projectActivities: [
                {
                    projectId: 2,
                    loading: false,
                    items: [
                        { type: 'create', employeeUrl: '/employees/2', activityDate: '2018-18-07' }
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
        }

        const expectedResult = {
            id: 2,
            name: 'project 2',
            activities: [
                {
                    type: 'create',
                    index: 0,
                    activityDate: '2018-18-07',
                    employeeUrl: '/employees/2',
                    employee: {
                        name: 'Mr Badger'
                    }
                }
            ]
        };

        expect(getProjectWithActivities(state, 2)).toEqual(expectedResult);
    });

    test('should return null when the project is loading', () => {

        const state = {
            projects: {
                loading: true,
                items: [
                    {
                        id: 1,
                        name: 'project 1'
                    },
                    {
                        id: 2,
                        name: 'project 2'
                    }
                ]
            },
            projectActivities: [
                {
                    projectId: 2,
                    loading: false,
                    items: [
                        { type: 'create', activityDate: '2018-18-07' }
                    ]
                }],
            employees: []
        };

        expect(getProjectWithActivities(state, 2)).toBeNull();
    });

    test('should return null when the activities are loading', () => {

        const state = {
            projects: {
                items: [
                    {
                        id: 1,
                        name: 'project 1'
                    },
                    {
                        id: 2,
                        name: 'project 2'
                    }
                ]
            },
            projectActivities: [
                {
                    projectId: 2,
                    loading: true,
                    items: [
                    ]
                }
            ],
            employees: [
            ]
        };

        expect(getProjectWithActivities(state, null)).toBeNull();
    });
});
