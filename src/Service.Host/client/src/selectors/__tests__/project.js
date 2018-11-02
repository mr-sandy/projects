import { getProjectLoading, getProjectUpdating, getProject } from '../project';

describe('when getting project loading', () => {
    test('should return true if the projects are loading', () => {

        const state = {
            projects: {
                loaded: false,
                loading: true,
                items: [
                ]
            }
        }

        const expectedResult = true;

        expect(getProjectLoading(state, 2)).toEqual(expectedResult);
    });

    test('should return false if the project is not loadingloading', () => {

        const state = {
            projects: {
                loaded: true,
                loading: false,
                items: [
                    {
                        id: 1,
                        name: 'project 1',
                        updating: true
                    },
                    {
                        id: 2,
                        name: 'project 2',
                        updating: false
                    }
                ]
            }
        };

        const expectedResult = false;

        expect(getProjectLoading(state, 2)).toEqual(expectedResult);
    });
});

describe('when getting project updating', () => {
    test('should return true if the project is updating', () => {

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
                        updating: true
                    }
                ]
            }
        }

        const expectedResult = true;

        expect(getProjectUpdating(state, 2)).toEqual(expectedResult);
    });

    test('should return false if the project is not updating', () => {

        const state = {
            projects: {
                loaded: true,
                loading: false,
                items: [
                    {
                        id: 1,
                        name: 'project 1',
                        updating: true
                    },
                    {
                        id: 2,
                        name: 'project 2',
                        updating: false
                    }
                ]
            }
        }

        const expectedResult = false;

        expect(getProjectUpdating(state, 2)).toEqual(expectedResult);
    });
});

describe('when getting a project', () => {
    test('should get the specified project', () => {

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
            }
        }

        const expectedResult = {
            id: 2,
            name: 'project 2'
        };

        expect(getProject(state, 2)).toEqual(expectedResult);
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
            }
        };

        expect(getProject(state, 2)).toBeNull();
    });

    test('should return null when no project selected', () => {

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
            }
        };

        expect(getProject(state, null)).toBeNull();
    });
});
