import { getProjectsLoading, getProjectsLoaded } from '../projects';

describe('when getting projects loading', () => {
    test('should return true if the projects are loading', () => {

        const state = {
            projects: {
                loaded: false,
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
        }

        const expectedResult = true;

        expect(getProjectsLoading(state)).toEqual(expectedResult);
    });

    test('should return false if the projects are not loading', () => {

        const state = {
            projects: {
                loaded: false,
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
            }
        }

        const expectedResult = false;

        expect(getProjectsLoading(state)).toEqual(expectedResult);
    });
});

describe('when getting projects loaded', () => {
    test('should return true if the projects are loaded', () => {

        const state = {
            projects: {
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
            }
        }

        const expectedResult = true;

        expect(getProjectsLoaded(state)).toEqual(expectedResult);
    });

    test('should return false if the projects are not loaded', () => {

        const state = {
            projects: {
                loaded: false,
                loading: true,
                items: []
            }
        }

        const expectedResult = false;

        expect(getProjectsLoaded(state)).toEqual(expectedResult);
    });
});
