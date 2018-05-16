import { getProjectDateRange } from '../../utilities/projects';
import { statuses } from '../../../constants';

describe('when getting a project date range',
    () => {
        test('should return an extra month at each end',
            () => {

                const project = {
                    id: 1,
                    name: 'project 1',
                    phases: [
                        {
                            phase: 0,
                            status: statuses.COMPLETE,
                            startDate: '2018-01-05',
                            endDate: '2018-01-10'
                        },
                        {
                            phase: 1,
                            status: statuses.IN_PROGRESS,
                            startDate: '2018-01-11',
                            endDate: '2018-01-15'
                        },
                        {
                            phase: 2,
                            status: statuses.AT_RISK,
                            startDate: '2018-01-16',
                            endDate: '2018-01-21'
                        },
                        {
                            phase: 3,
                            status: statuses.PLANNED,
                            startDate: '2018-01-22',
                            endDate: '2018-01-26'
                        }
                    ]
                };

                const expectedResult = {
                    startDate: new Date('2017-12-01T00:00:00.000Z'),
                    endDate: new Date('2018-02-28T23:59:59.999Z'),
                    noOfMonths: 3
                };

                expect(getProjectDateRange(project)).toEqual(expectedResult);
            });
    });
