import projects from '../projects';
import * as actionTypes from '../../actions';

describe('when requesting projects', () => {
    test('loading should be set to true and existing data cleared', () => {

        const state = {
            loaded: true,
            loading: false,
            items: [
                {
                    id: 1,
                    name: 'project 1'
                }
            ]
        };

        const action = {
            type: actionTypes.PROJECTS_REQUESTED,
            payload: {}
        };

        const expectedState = {
            loaded: false,
            loading: true,
            items: []
        };

        expect(projects(state, action)).toEqual(expectedState);
    });
});

describe('when receiving projects', () => {
    test('loading should be set to false, loaded to true', () => {

        const state = {
            loaded: false,
            loading: true,
            items: []
        };

        const action = {
            type: actionTypes.PROJECTS_RECEIVED,
            payload: [
                {
                    id: 1,
                    name: 'project 1'
                },
                {
                    id: 2,
                    name: 'project 2'
                }
            ]
        };

        const expectedState = {
            loaded: true,
            loading: false,
            items: [{
                id: 1,
                name: 'project 1'
            },
            {
                id: 2,
                name: 'project 2'
            }
            ]
        };

        expect(projects(state, action)).toEqual(expectedState);
    });
});

describe('when creating a project', () => {
    test('it should be added', () => {

        const state = {
            loaded: true,
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
        };

        const action = {
            type: actionTypes.CREATE_PROJECT_SUCCEEDED,
            payload: {
                id: 3,
                name: 'project 3'
            }
        };

        const expectedState = {
            loaded: true,
            loading: false,
            items: [
                {
                    id: 1,
                    name: 'project 1'
                },
                {
                    id: 2,
                    name: 'project 2'
                },
                {
                    id: 3,
                    name: 'project 3'
                }
            ]
        };

        expect(projects(state, action)).toEqual(expectedState);
    });
});

describe('when deleting a project', () => {
    test('it should be removed on request', () => {

        const state = {
            loaded: true,
            loading: false,
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
        };

        const action = {
            type: actionTypes.DELETE_PROJECT_REQUESTED,
            payload: {
                projectId: 2
            }
        };

        const expectedState = {
            loaded: true,
            loading: true,
            items: [
                {
                    id: 1,
                    name: 'project 1'
                }
            ]
        };

        expect(projects(state, action)).toEqual(expectedState);
    });

    test('loading should be set to false on success', () => {

        const state = {
            loaded: true,
            loading: true,
            items: [
                {
                    id: 1,
                    name: 'project 1'
                }
            ]
        };

        const action = {
            type: actionTypes.DELETE_PROJECT_SUCCEEDED,
            payload: {
                projectId: 2
            }
        };

        const expectedState = {
            loaded: true,
            loading: false,
            items: [
                {
                    id: 1,
                    name: 'project 1'
                }
            ]
        };

        expect(projects(state, action)).toEqual(expectedState);
    });
});

describe('when update a project', () => {
    test('the project should be updated on request', () => {

        const state = {
            loaded: true,
            loading: false,
            items: [
                {
                    id: 1,
                    name: 'project 1'
                },
                {
                    id: 2,
                    name: 'project 2',
                    startDate: '2018-02-03',
                    updating: false
                }
            ]
        };

        const action = {
            type: actionTypes.UPDATE_PROJECT_REQUESTED,
            payload: {
                projectId: 2,
                data: {
                    id: 2,
                    name: 'project 2 mkii',
                    startDate: '2018-02-04'
                }
            }
        };

        const expectedState = {
            loaded: true,
            loading: false,
            items: [
                {
                    id: 1,
                    name: 'project 1'
                },
                {
                    id: 2,
                    name: 'project 2 mkii',
                    startDate: '2018-02-04',
                    updating: true
                }
            ]
        };

        expect(projects(state, action)).toEqual(expectedState);
    });

    test('the updating flag should be set to false on success', () => {

        const state = {
            loaded: true,
            loading: false,
            items: [
                {
                    id: 1,
                    name: 'project 1'
                },
                {
                    id: 2,
                    name: 'project 2 mkii',
                    startDate: '2018-02-04',
                    updating: true
                }
            ]
        };

        const action = {
            type: actionTypes.UPDATE_PROJECT_SUCCEEDED,
            payload: {
                projectId: 2,
                data: {
                    id: 2,
                    name: 'project 2 mkii',
                    startDate: '2018-02-04'
                }
            }
        };

        const expectedState = {
            loaded: true,
            loading: false,
            items: [
                {
                    id: 1,
                    name: 'project 1'
                },
                {
                    id: 2,
                    name: 'project 2 mkii',
                    startDate: '2018-02-04',
                    updating: false
                }
            ]
        };

        expect(projects(state, action)).toEqual(expectedState);
    });
});

describe('when adding a phase', () => {
    test('a new phase should be added on request', () => {

        const state = {
            loaded: true,
            loading: false,
            items: [
                {
                    id: 1,
                    name: 'project 1',
                    phases: [],
                    updating: false
                },
                {
                    id: 2,
                    name: 'project 2',
                    phases: [{
                        phaseNumber: 0,
                        status: 'PLANNED',
                        endDate: '2018-07-25T00:00:0Z'
                    },
                    {
                        phaseNumber: 1,
                        status: 'PLANNED',
                        endDate: '2018-08-25T00:00:0Z'
                    },
                    {
                        phaseNumber: 2,
                        status: 'PLANNED',
                        endDate: '2018-09-25T00:00:0Z'
                    }],
                    updating: true
                }
            ]
        };

        const action = {
            type: actionTypes.ADD_PHASE_REQUESTED,
            payload: {
                projectId: 2,
                data: {
                    phaseNumber: 4,
                    status: 'PLANNED',
                    endDate: '2018-10-25T00:00:0Z'
                }
            }
        };

        const expectedState = {
            loaded: true,
            loading: false,
            items: [
                {
                    id: 1,
                    name: 'project 1',
                    phases: [],
                    updating: false
                },
                {
                    id: 2,
                    name: 'project 2',
                    phases: [{
                        phaseNumber: 0,
                        status: 'PLANNED',
                        endDate: '2018-07-25T00:00:0Z'
                    },
                    {
                        phaseNumber: 1,
                        status: 'PLANNED',
                        endDate: '2018-08-25T00:00:0Z'
                    },
                    {
                        phaseNumber: 2,
                        status: 'PLANNED',
                        endDate: '2018-09-25T00:00:0Z'
                    },
                    {
                        phaseNumber: 4,
                        status: 'PLANNED',
                        endDate: '2018-10-25T00:00:0Z'
                    }],
                    updating: true
                }
            ]
        };

        expect(projects(state, action)).toEqual(expectedState);
    });

    test('the updating flag should be set to false on success',() => {
        const state = {
            loaded: true,
            loading: false,
            items: [
                {
                    id: 1,
                    name: 'project 1',
                    phases: [],
                    updating: false
                },
                {
                    id: 2,
                    name: 'project 2',
                    phases: [{
                            phaseNumber: 0,
                            status: 'PLANNED',
                            endDate: '2018-07-25T00:00:0Z'
                        },
                        {
                            phaseNumber: 1,
                            status: 'PLANNED',
                            endDate: '2018-08-25T00:00:0Z'
                        },
                        {
                            phaseNumber: 2,
                            status: 'PLANNED',
                            endDate: '2018-09-25T00:00:0Z'
                        },
                        {
                            phaseNumber: 4,
                            status: 'PLANNED',
                            endDate: '2018-10-25T00:00:0Z'
                        }],
                    updating: true
                }
            ]
        };

        const action = {
            type: actionTypes.ADD_PHASE_SUCCEEDED,
            payload: {
                projectId: 2,
                data: {
                    phaseNumber: 4,
                    status: 'PLANNED',
                    endDate: '2018-10-25T00:00:0Z'
                }
            }
        };

        const expectedState = {
            loaded: true,
            loading: false,
            items: [
                {
                    id: 1,
                    name: 'project 1',
                    phases: [],
                    updating: false
                },
                {
                    id: 2,
                    name: 'project 2',
                    phases: [{
                        phaseNumber: 0,
                        status: 'PLANNED',
                        endDate: '2018-07-25T00:00:0Z'
                    },
                    {
                        phaseNumber: 1,
                        status: 'PLANNED',
                        endDate: '2018-08-25T00:00:0Z'
                    },
                    {
                        phaseNumber: 2,
                        status: 'PLANNED',
                        endDate: '2018-09-25T00:00:0Z'
                    },
                    {
                        phaseNumber: 4,
                        status: 'PLANNED',
                        endDate: '2018-10-25T00:00:0Z'
                    }],
                    updating: false
                }
            ]
        };

        expect(projects(state, action)).toEqual(expectedState);
    });
});

describe('when updating a phase', () => {
    test('the phase should be updated on request', () => {

        const state = {
            loaded: true,
            loading: false,
            items: [
                {
                    id: 1,
                    name: 'project 1',
                    phases: [],
                    updating: false
                },
                {
                    id: 2,
                    name: 'project 2',
                    phases: [{
                        phaseNumber: 0,
                        status: 'PLANNED',
                        endDate: '2018-07-25T00:00:0Z'
                    },
                    {
                        phaseNumber: 1,
                        status: 'PLANNED',
                        endDate: '2018-08-25T00:00:0Z'
                    },
                    {
                        phaseNumber: 2,
                        status: 'PLANNED',
                        endDate: '2018-09-25T00:00:0Z'
                    }],
                    updating: true
                }
            ]
        };

        const action = {
            type: actionTypes.UPDATE_PHASE_REQUESTED,
            payload: {
                projectId: 2,
                data: {
                    phaseNumber: 1,
                    status: 'IN_PROGRESS',
                    endDate: '2018-08-30T00:00:0Z'
                }
            }
        };

        const expectedState = {
            loaded: true,
            loading: false,
            items: [
                {
                    id: 1,
                    name: 'project 1',
                    phases: [],
                    updating: false
                },
                {
                    id: 2,
                    name: 'project 2',
                    phases: [{
                        phaseNumber: 0,
                        status: 'PLANNED',
                        endDate: '2018-07-25T00:00:0Z'
                    },
                    {
                        phaseNumber: 1,
                        status: 'IN_PROGRESS',
                        endDate: '2018-08-30T00:00:0Z'
                    },
                    {
                        phaseNumber: 2,
                        status: 'PLANNED',
                        endDate: '2018-09-25T00:00:0Z'
                    }],
                    updating: true
                }
            ]
        };

        expect(projects(state, action)).toEqual(expectedState);
    });

    test('the updating flag should be set to false on success', () => {
        const state = {
            loaded: true,
            loading: false,
            items: [
                {
                    id: 1,
                    name: 'project 1',
                    phases: [],
                    updating: false
                },
                {
                    id: 2,
                    name: 'project 2',
                    phases: [{
                            phaseNumber: 0,
                            status: 'PLANNED',
                            endDate: '2018-07-25T00:00:0Z'
                        },
                        {
                            phaseNumber: 1,
                            status: 'IN_PROGRESS',
                            endDate: '2018-08-30T00:00:0Z'
                        },
                        {
                            phaseNumber: 2,
                            status: 'PLANNED',
                            endDate: '2018-09-25T00:00:0Z'
                        }],
                    updating: true
                }
            ]
        };

        const action = {
            type: actionTypes.UPDATE_PHASE_SUCCEEDED,
            payload: {
                projectId: 2,
                data: {
                    phaseNumber: 4,
                    status: 'PLANNED',
                    endDate: '2018-10-25T00:00:0Z'
                }
            }
        };

        const expectedState = {
            loaded: true,
            loading: false,
            items: [
                {
                    id: 1,
                    name: 'project 1',
                    phases: [],
                    updating: false
                },
                {
                    id: 2,
                    name: 'project 2',
                    phases: [{
                            phaseNumber: 0,
                            status: 'PLANNED',
                            endDate: '2018-07-25T00:00:0Z'
                        },
                        {
                            phaseNumber: 1,
                            status: 'IN_PROGRESS',
                            endDate: '2018-08-30T00:00:0Z'
                        },
                        {
                            phaseNumber: 2,
                            status: 'PLANNED',
                            endDate: '2018-09-25T00:00:0Z'
                        }],
                    updating: false
                }
            ]
        };

        expect(projects(state, action)).toEqual(expectedState);
    });

});

describe('when removing a phase', () => {
    test('the phase should be removed on request', () => {

        const state = {
            loaded: true,
            loading: false,
            items: [
                {
                    id: 1,
                    name: 'project 1',
                    phases: [],
                    updating: false
                },
                {
                    id: 2,
                    name: 'project 2',
                    phases: [{
                        phaseNumber: 0,
                        status: 'PLANNED',
                        endDate: '2018-07-25T00:00:0Z'
                    },
                    {
                        phaseNumber: 1,
                        status: 'PLANNED',
                        endDate: '2018-08-25T00:00:0Z'
                    },
                    {
                        phaseNumber: 2,
                        status: 'PLANNED',
                        endDate: '2018-09-25T00:00:0Z'
                    }],
                    updating: false
                }
            ]
        };

        const action = {
            type: actionTypes.REMOVE_PHASE_REQUESTED,
            payload: {
                projectId: 2,
                data: {
                    phaseNumber: 2,
                    status: 'PLANNED',
                    endDate: '2018-09-25T00:00:0Z'
                }
            }
        };

        const expectedState = {
            loaded: true,
            loading: false,
            items: [
                {
                    id: 1,
                    name: 'project 1',
                    phases: [],
                    updating: false
                },
                {
                    id: 2,
                    name: 'project 2',
                    phases: [{
                        phaseNumber: 0,
                        status: 'PLANNED',
                        endDate: '2018-07-25T00:00:0Z'
                    },
                    {
                        phaseNumber: 1,
                        status: 'PLANNED',
                        endDate: '2018-08-25T00:00:0Z'
                    }],
                    updating: true
                }
            ]
        };

        expect(projects(state, action)).toEqual(expectedState);
    });

    test('the updating flag should be set to false on success', () => {

        const state = {
            loaded: true,
            loading: false,
            items: [
                {
                    id: 1,
                    name: 'project 1',
                    phases: [],
                    updating: false
                },
                {
                    id: 2,
                    name: 'project 2',
                    phases: [{
                            phaseNumber: 0,
                            status: 'PLANNED',
                            endDate: '2018-07-25T00:00:0Z'
                        },
                        {
                            phaseNumber: 1,
                            status: 'PLANNED',
                            endDate: '2018-08-25T00:00:0Z'
                        }],
                    updating: true
                }
            ]
        };

        const action = {
            type: actionTypes.REMOVE_PHASE_SUCCEEDED,
            payload: {
                projectId: 2,
                data: {
                    phaseNumber: 2,
                    status: 'PLANNED',
                    endDate: '2018-09-25T00:00:0Z'
                }
            }
        };

        const expectedState = {
            loaded: true,
            loading: false,
            items: [
                {
                    id: 1,
                    name: 'project 1',
                    phases: [],
                    updating: false
                },
                {
                    id: 2,
                    name: 'project 2',
                    phases: [{
                        phaseNumber: 0,
                        status: 'PLANNED',
                        endDate: '2018-07-25T00:00:0Z'
                    },
                    {
                        phaseNumber: 1,
                        status: 'PLANNED',
                        endDate: '2018-08-25T00:00:0Z'
                    }],
                    updating: false
                }
            ]
        };

        expect(projects(state, action)).toEqual(expectedState);
    });
});
