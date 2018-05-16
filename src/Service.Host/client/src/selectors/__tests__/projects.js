import { getProject } from '../projects';

describe('when getting a project', () => {
    test('should get the specified project', () => {

        const state = {
            projects: [
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

        const expectedResult = { 
            id: 2,
            name: 'project 2'
         };

        expect(getProject(state, 2)).toEqual(expectedResult);
    });

    test('should return null when no project selected', () => {

        const state = {
            projects: [
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

        expect(getProject(state, null)).toBeNull();
    });
});
