import { getProjectChart, getSummaryChart } from '../charts';
import { statuses } from '../../constants';

const overallStart = (day, days) => (day - 1) / days;
const overallEnd = (day, days) => day / days;

const monthlyStart = overallStart;
const monthlyEnd = overallEnd;

describe('when getting a project chart', () => {
    test('for a short project', () => {

        const state = {
            projects: [
                {
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
                }
            ]
        };

        const expectedResult = {
            months: [
                { month: 12, year: 2017, daysInMonth: 31 },
                { month: 1, year: 2018, daysInMonth: 31 },
                { month: 2, year: 2018, daysInMonth: 28 }
            ],
            project: {
                id: 1,
                name: 'project 1',
                phases: [
                    {
                        phase: 0,
                        status: statuses.COMPLETE,
                        startDate: '2018-01-05',
                        endDate: '2018-01-10',
                        timeline: {
                            overall: {
                                start: overallStart(36, 90),
                                end: overallEnd(41, 90)
                            },
                            monthly: [
                                {
                                    month: 12,
                                    year: 2017,
                                    start: null,
                                    end: null
                                },
                                {
                                    month: 1,
                                    year: 2018,
                                    start: monthlyStart(5, 31),
                                    end: monthlyEnd(10, 31)
                                },
                                {
                                    month: 2,
                                    year: 2018,
                                    start: null,
                                    end: null
                                }
                            ]
                        }
                    },
                    {
                        phase: 1,
                        status: statuses.IN_PROGRESS,
                        startDate: '2018-01-11',
                        endDate: '2018-01-15',
                        timeline: {
                            overall: {
                                start: overallStart(42, 90),
                                end: overallEnd(46, 90)
                            },
                            monthly: [
                                {
                                    month: 12,
                                    year: 2017,
                                    start: null,
                                    end: null
                                },
                                {
                                    month: 1,
                                    year: 2018,
                                    start: monthlyStart(11, 31),
                                    end: monthlyEnd(15, 31)
                                },
                                {
                                    month: 2,
                                    year: 2018,
                                    start: null,
                                    end: null
                                }
                            ]
                        }
                    },
                    {
                        phase: 2,
                        status: statuses.AT_RISK,
                        startDate: '2018-01-16',
                        endDate: '2018-01-21',
                        timeline: {
                            overall: {
                                start: overallStart(47, 90),
                                end: overallEnd(52, 90)
                            },
                            monthly: [
                                {
                                    month: 12,
                                    year: 2017,
                                    start: null,
                                    end: null
                                },
                                {
                                    month: 1,
                                    year: 2018,
                                    start: monthlyStart(16, 31),
                                    end: monthlyEnd(21, 31)
                                },
                                {
                                    month: 2,
                                    year: 2018,
                                    start: null,
                                    end: null
                                }
                            ]
                        }
                    },
                    {
                        phase: 3,
                        status: statuses.PLANNED,
                        startDate: '2018-01-22',
                        endDate: '2018-01-26',
                        timeline: {
                            overall: {
                                start: overallStart(53, 90),
                                end: overallEnd(57, 90)
                            },
                            monthly: [
                                {
                                    month: 12,
                                    year: 2017,
                                    start: null,
                                    end: null
                                },
                                {
                                    month: 1,
                                    year: 2018,
                                    start: monthlyStart(22, 31),
                                    end: monthlyEnd(26, 31)
                                },
                                {
                                    month: 2,
                                    year: 2018,
                                    start: null,
                                    end: null
                                }
                            ]
                        }
                    }
                ]
            }
        };

        expect(getProjectChart(state, 1)).toEqual(expectedResult);
    });

    test('for a long project', () => {

        const state = {
            projects: [
                {
                    id: 1,
                    name: 'project 1',
                    phases: [
                        {
                            phase: 0,
                            status: statuses.COMPLETE,
                            startDate: '2018-01-05',
                            endDate: '2018-01-20'
                        },
                        {
                            phase: 1,
                            status: statuses.IN_PROGRESS,
                            startDate: '2018-01-21',
                            endDate: '2018-02-03'
                        },
                        {
                            phase: 2,
                            status: statuses.AT_RISK,
                            startDate: '2018-02-04',
                            endDate: '2018-02-21'
                        },
                        {
                            phase: 3,
                            status: statuses.PLANNED,
                            startDate: '2018-02-22',
                            endDate: '2018-03-06'
                        }
                    ]
                }
            ]
        };

        const expectedResult = {
            months: [
                { month: 12, year: 2017, daysInMonth: 31 },
                { month: 1, year: 2018, daysInMonth: 31 },
                { month: 2, year: 2018, daysInMonth: 28 },
                { month: 3, year: 2018, daysInMonth: 31 },
                { month: 4, year: 2018, daysInMonth: 30 }
            ],
            project: {
                id: 1,
                name: 'project 1',
                phases: [
                    {
                        phase: 0,
                        status: statuses.COMPLETE,
                        startDate: '2018-01-05',
                        endDate: '2018-01-20',
                        timeline: {
                            overall: {
                                start: overallStart(36, 151),
                                end: overallEnd(51, 151)
                            },
                            monthly: [
                                {
                                    month: 12,
                                    year: 2017,
                                    start: null,
                                    end: null
                                },
                                {
                                    month: 1,
                                    year: 2018,
                                    start: monthlyStart(5, 31),
                                    end: monthlyEnd(20, 31)
                                },
                                {
                                    month: 2,
                                    year: 2018,
                                    start: null,
                                    end: null
                                },
                                {
                                    month: 3,
                                    year: 2018,
                                    start: null,
                                    end: null
                                },
                                {
                                    month: 4,
                                    year: 2018,
                                    start: null,
                                    end: null
                                }
                            ]
                        }
                    },
                    {
                        phase: 1,
                        status: statuses.IN_PROGRESS,
                        startDate: '2018-01-21',
                        endDate: '2018-02-03',
                        timeline: {
                            overall: {
                                start: overallStart(52, 151),
                                end: overallEnd(65, 151)
                            },
                            monthly: [
                                {
                                    month: 12,
                                    year: 2017,
                                    start: null,
                                    end: null
                                },
                                {
                                    month: 1,
                                    year: 2018,
                                    start: monthlyStart(21, 31),
                                    end: 1.1
                                },
                                {
                                    month: 2,
                                    year: 2018,
                                    start: -0.1,
                                    end: monthlyEnd(3, 28)
                                },
                                {
                                    month: 3,
                                    year: 2018,
                                    start: null,
                                    end: null
                                },
                                {
                                    month: 4,
                                    year: 2018,
                                    start: null,
                                    end: null
                                }
                            ]
                        }
                    },
                    {
                        phase: 2,
                        status: statuses.AT_RISK,
                        startDate: '2018-02-04',
                        endDate: '2018-02-21',
                        timeline: {
                            overall: {
                                start: overallStart(66, 151),
                                end: overallEnd(83, 151)
                            },
                            monthly: [
                                {
                                    month: 12,
                                    year: 2017,
                                    start: null,
                                    end: null
                                },
                                {
                                    month: 1,
                                    year: 2018,
                                    start: null,
                                    end: null
                                },
                                {
                                    month: 2,
                                    year: 2018,
                                    start: monthlyStart(4, 28),
                                    end: monthlyEnd(21, 28)
                                },
                                {
                                    month: 3,
                                    year: 2018,
                                    start: null,
                                    end: null
                                },
                                {
                                    month: 4,
                                    year: 2018,
                                    start: null,
                                    end: null
                                }
                            ]
                        }
                    },
                    {
                        phase: 3,
                        status: statuses.PLANNED,
                        startDate: '2018-02-22',
                        endDate: '2018-03-06',
                        timeline: {
                            overall: {
                                start: overallStart(84, 151),
                                end: overallEnd(96, 151)
                            },
                            monthly: [
                                {
                                    month: 12,
                                    year: 2017,
                                    start: null,
                                    end: null
                                },
                                {
                                    month: 1,
                                    year: 2018,
                                    start: null,
                                    end: null
                                },
                                {
                                    month: 2,
                                    year: 2018,
                                    start: monthlyStart(22, 28),
                                    end: 1.1
                                },
                                {
                                    month: 3,
                                    year: 2018,
                                    start: -0.1,
                                    end: monthlyEnd(6, 31)
                                },
                                {
                                    month: 4,
                                    year: 2018,
                                    start: null,
                                    end: null
                                }
                            ]
                        }
                    }
                ]
            }
        };

        expect(getProjectChart(state, 1)).toEqual(expectedResult);
    });
});

describe('when getting a summary chart', () => {
    test('for one short project for three month window', () => {

        const state = {
            application: {
                dashboard: {
                    startDate: '2018-01-01',
                    monthsToShow: 3
                }
            },
            projects: [
                {
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
                }
            ]
        };

        const expectedResult = {
            months: [
                { month: 1, year: 2018, daysInMonth: 31 },
                { month: 2, year: 2018, daysInMonth: 28 },
                { month: 3, year: 2018, daysInMonth: 31 }
            ],
            projects: [
                {
                    id: 1,
                    name: 'project 1',
                    phases: [
                        {
                            phase: 0,
                            status: statuses.COMPLETE,
                            startDate: '2018-01-05',
                            endDate: '2018-01-10',
                            timeline: {
                                overall: {
                                    start: overallStart(5, 90),
                                    end: overallEnd(10, 90)
                                },
                                monthly: [
                                    {
                                        month: 1,
                                        year: 2018,
                                        start: monthlyStart(5, 31),
                                        end: monthlyEnd(10, 31)
                                    },
                                    {
                                        month: 2,
                                        year: 2018,
                                        start: null,
                                        end: null
                                    },
                                    {
                                        month: 3,
                                        year: 2018,
                                        start: null,
                                        end: null
                                    }
                                ]
                            }
                        },
                        {
                            phase: 1,
                            status: statuses.IN_PROGRESS,
                            startDate: '2018-01-11',
                            endDate: '2018-01-15',
                            timeline: {
                                overall: {
                                    start: overallStart(11, 90),
                                    end: overallEnd(15, 90)
                                },
                                monthly: [
                                    {
                                        month: 1,
                                        year: 2018,
                                        start: monthlyStart(11, 31),
                                        end: monthlyEnd(15, 31)
                                    },
                                    {
                                        month: 2,
                                        year: 2018,
                                        start: null,
                                        end: null
                                    },
                                    {
                                        month: 3,
                                        year: 2018,
                                        start: null,
                                        end: null
                                    }
                                ]
                            }
                        },
                        {
                            phase: 2,
                            status: statuses.AT_RISK,
                            startDate: '2018-01-16',
                            endDate: '2018-01-21',
                            timeline: {
                                overall: {
                                    start: overallStart(16, 90),
                                    end: overallEnd(21, 90)
                                },
                                monthly: [
                                    {
                                        month: 1,
                                        year: 2018,
                                        start: monthlyStart(16, 31),
                                        end: monthlyEnd(21, 31)
                                    },
                                    {
                                        month: 2,
                                        year: 2018,
                                        start: null,
                                        end: null
                                    },
                                    {
                                        month: 3,
                                        year: 2018,
                                        start: null,
                                        end: null
                                    }
                                ]
                            }
                        },
                        {
                            phase: 3,
                            status: statuses.PLANNED,
                            startDate: '2018-01-22',
                            endDate: '2018-01-26',
                            timeline: {
                                overall: {
                                    start: overallStart(22, 90),
                                    end: overallEnd(26, 90)
                                },
                                monthly: [
                                    {
                                        month: 1,
                                        year: 2018,
                                        start: monthlyStart(22, 31),
                                        end: monthlyEnd(26, 31)
                                    },
                                    {
                                        month: 2,
                                        year: 2018,
                                        start: null,
                                        end: null
                                    },
                                    {
                                        month: 3,
                                        year: 2018,
                                        start: null,
                                        end: null
                                    }
                                ]
                            }
                        }
                    ]
                }
            ]
        };

        expect(getSummaryChart(state)).toEqual(expectedResult);
    });

    test('for one long project for three month window', () => {

        const state = {
            application: {
                dashboard: {
                    startDate: '2018-01-01',
                    monthsToShow: 3
                }
            },
            projects: [
                {
                    id: 1,
                    name: 'project 1',
                    phases: [
                        {
                            phase: 0,
                            status: statuses.COMPLETE,
                            startDate: '2018-01-05',
                            endDate: '2018-01-31'
                        },
                        {
                            phase: 1,
                            status: statuses.IN_PROGRESS,
                            startDate: '2018-02-01',
                            endDate: '2018-02-03'
                        },
                        {
                            phase: 2,
                            status: statuses.AT_RISK,
                            startDate: '2018-02-04',
                            endDate: '2018-02-21'
                        },
                        {
                            phase: 3,
                            status: statuses.PLANNED,
                            startDate: '2018-02-22',
                            endDate: '2018-03-06'
                        }
                    ]
                }
            ]
        };

        const expectedResult = {
            months: [
                { month: 1, year: 2018, daysInMonth: 31 },
                { month: 2, year: 2018, daysInMonth: 28 },
                { month: 3, year: 2018, daysInMonth: 31 }
            ],
            projects: [{
                id: 1,
                name: 'project 1',
                phases: [
                    {
                        phase: 0,
                        status: statuses.COMPLETE,
                        startDate: '2018-01-05',
                        endDate: '2018-01-31',
                        timeline: {
                            overall: {
                                start: overallStart(5, 90),
                                end: overallEnd(31, 90)
                            },
                            monthly: [
                                {
                                    month: 1,
                                    year: 2018,
                                    start: monthlyStart(5, 31),
                                    end: 1
                                },
                                {
                                    month: 2,
                                    year: 2018,
                                    start: null,
                                    end: null
                                },
                                {
                                    month: 3,
                                    year: 2018,
                                    start: null,
                                    end: null
                                }
                            ]
                        }
                    },
                    {
                        phase: 1,
                        status: statuses.IN_PROGRESS,
                        startDate: '2018-02-01',
                        endDate: '2018-02-03',
                        timeline: {
                            overall: {
                                start: overallStart(32, 90),
                                end: overallEnd(34, 90)
                            },
                            monthly: [
                                {
                                    month: 1,
                                    year: 2018,
                                    start: null,
                                    end: null
                                },
                                {
                                    month: 2,
                                    year: 2018,
                                    start: 0,
                                    end: monthlyEnd(3, 28)
                                },
                                {
                                    month: 3,
                                    year: 2018,
                                    start: null,
                                    end: null
                                }
                            ]
                        }
                    },
                    {
                        phase: 2,
                        status: statuses.AT_RISK,
                        startDate: '2018-02-04',
                        endDate: '2018-02-21',
                        timeline: {
                            overall: {
                                start: overallStart(35, 90),
                                end: overallEnd(52, 90)
                            },
                            monthly: [
                                {
                                    month: 1,
                                    year: 2018,
                                    start: null,
                                    end: null
                                },
                                {
                                    month: 2,
                                    year: 2018,
                                    start: monthlyStart(4, 28),
                                    end: monthlyEnd(21, 28)
                                },
                                {
                                    month: 3,
                                    year: 2018,
                                    start: null,
                                    end: null
                                }
                            ]
                        }
                    },
                    {
                        phase: 3,
                        status: statuses.PLANNED,
                        startDate: '2018-02-22',
                        endDate: '2018-03-06',
                        timeline: {
                            overall: {
                                start: overallStart(53, 90),
                                end: overallEnd(65, 90)
                            },
                            monthly: [
                                {
                                    month: 1,
                                    year: 2018,
                                    start: null,
                                    end: null
                                },
                                {
                                    month: 2,
                                    year: 2018,
                                    start: monthlyStart(22, 28),
                                    end: 1.1
                                },
                                {
                                    month: 3,
                                    year: 2018,
                                    start: -0.1,
                                    end: monthlyEnd(6, 31)
                                }
                            ]
                        }
                    }
                ]
            }]
        };


        expect(getSummaryChart(state)).toEqual(expectedResult);
    });

    test('phases ouside the timeline should show null start and ends', () => {

        const state = {
            application: {
                dashboard: {
                    startDate: '2018-03-01',
                    monthsToShow: 3
                }
            },
            projects: [
                {
                    id: 1,
                    name: 'project 1',
                    phases: [
                        {
                            phase: 0,
                            status: statuses.COMPLETE,
                            startDate: '2018-01-05',
                            endDate: '2018-01-20'
                        },
                        {
                            phase: 1,
                            status: statuses.IN_PROGRESS,
                            startDate: '2018-01-21',
                            endDate: '2018-02-03'
                        },
                        {
                            phase: 2,
                            status: statuses.AT_RISK,
                            startDate: '2018-02-04',
                            endDate: '2018-02-21'
                        },
                        {
                            phase: 3,
                            status: statuses.PLANNED,
                            startDate: '2018-02-22',
                            endDate: '2018-03-06'
                        }
                    ]
                }
            ]
        };

        const expectedResult = {
            months: [
                { month: 3, year: 2018, daysInMonth: 31 },
                { month: 4, year: 2018, daysInMonth: 30 },
                { month: 5, year: 2018, daysInMonth: 31 }
            ],
            projects: [{
                id: 1,
                name: 'project 1',
                phases: [
                    {
                        phase: 0,
                        status: statuses.COMPLETE,
                        startDate: '2018-01-05',
                        endDate: '2018-01-20',
                        timeline: {
                            overall: {
                                start: null,
                                end: null
                            },
                            monthly: [
                                {
                                    month: 3,
                                    year: 2018,
                                    start: null,
                                    end: null
                                },
                                {
                                    month: 4,
                                    year: 2018,
                                    start: null,
                                    end: null
                                },
                                {
                                    month: 5,
                                    year: 2018,
                                    start: null,
                                    end: null
                                }
                            ]
                        }
                    },
                    {
                        phase: 1,
                        status: statuses.IN_PROGRESS,
                        startDate: '2018-01-21',
                        endDate: '2018-02-03',
                        timeline: {
                            overall: {
                                start: null,
                                end: null
                            },
                            monthly: [
                                {
                                    month: 3,
                                    year: 2018,
                                    start: null,
                                    end: null
                                },
                                {
                                    month: 4,
                                    year: 2018,
                                    start: null,
                                    end: null
                                },
                                {
                                    month: 5,
                                    year: 2018,
                                    start: null,
                                    end: null
                                }
                            ]
                        }
                    },
                    {
                        phase: 2,
                        status: statuses.AT_RISK,
                        startDate: '2018-02-04',
                        endDate: '2018-02-21',
                        timeline: {
                            overall: {
                                start: null,
                                end: null
                            },
                            monthly: [
                                {
                                    month: 3,
                                    year: 2018,
                                    start: null,
                                    end: null
                                },
                                {
                                    month: 4,
                                    year: 2018,
                                    start: null,
                                    end: null
                                },
                                {
                                    month: 5,
                                    year: 2018,
                                    start: null,
                                    end: null
                                }
                            ]
                        }
                    },
                    {
                        phase: 3,
                        status: statuses.PLANNED,
                        startDate: '2018-02-22',
                        endDate: '2018-03-06',
                        timeline: {
                            overall: {
                                start: -0.1,
                                end: overallEnd(6, 92)
                            },
                            monthly: [
                                {
                                    month: 3,
                                    year: 2018,
                                    start: -0.1,
                                    end: monthlyEnd(6, 31)
                                },
                                {
                                    month: 4,
                                    year: 2018,
                                    start: null,
                                    end: null
                                },
                                {
                                    month: 5,
                                    year: 2018,
                                    start: null,
                                    end: null
                                }
                            ]
                        }
                    }
                ]
            }]
        };

        expect(getSummaryChart(state)).toEqual(expectedResult);
    });

    test('ignore projects outwith the date range', () => {

        const state = {
            application: {
                dashboard: {
                    startDate: '2018-04-01',
                    monthsToShow: 3
                }
            },
            projects: [
                {
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
                }
            ]
        };

        const expectedResult = {
            months: [
                { month: 4, year: 2018, daysInMonth: 30 },
                { month: 5, year: 2018, daysInMonth: 31 },
                { month: 6, year: 2018, daysInMonth: 30 }
            ],
            projects: []
        };

        expect(getSummaryChart(state)).toEqual(expectedResult);
    });
});
