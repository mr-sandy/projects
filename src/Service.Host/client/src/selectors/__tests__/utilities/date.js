import { getMonths, getRelativeDate, getRelativeStart, getRelativeEnd } from '../../utilities/date';

describe('when getting months', () => {

    test('for one month at the start of DST', () => {

        const startDate = new Date('2018-03-01');
        const noOfMonths = 1;

        const expectedResult = [
            {
                month: 3,
                year: 2018,
                startDate: new Date('2018-03-01'),
                endDate: new Date('2018-03-31'),
                daysInMonth: 31
            }
        ];

        expect(getMonths(startDate, noOfMonths)).toEqual(expectedResult);
    });

    test('for one month at the end of DST', () => {

        const startDate = new Date('2018-10-01');
        const noOfMonths = 1;

        const expectedResult = [
            {
                month: 10,
                year: 2018,
                startDate: new Date('2018-10-01'),
                endDate: new Date('2018-10-31'),
                daysInMonth: 31
            }
        ];

        expect(getMonths(startDate, noOfMonths)).toEqual(expectedResult);
    });

    test('for six months', () => {

        const startDate = new Date('2018-10-01');
        const noOfMonths = 6;

        const expectedResult = [
            {
                month: 10,
                year: 2018,
                startDate: new Date('2018-10-01'),
                endDate: new Date('2018-10-31'),
                daysInMonth: 31
            },
            {
                month: 11,
                year: 2018,
                startDate: new Date('2018-11-01'),
                endDate: new Date('2018-11-30'),
                daysInMonth: 30
            },
            {
                month: 12,
                year: 2018,
                startDate: new Date('2018-12-01'),
                endDate: new Date('2018-12-31'),
                daysInMonth: 31
            },
            {
                month: 1,
                year: 2019,
                startDate: new Date('2019-01-01'),
                endDate: new Date('2019-01-31'),
                daysInMonth: 31
            },
            {
                month: 2,
                year: 2019,
                startDate: new Date('2019-02-01'),
                endDate: new Date('2019-02-28'),
                daysInMonth: 28
            },
            {
                month: 3,
                year: 2019,
                startDate: new Date('2019-03-01'),
                endDate: new Date('2019-03-31'),
                daysInMonth: 31
            }
        ];

        expect(getMonths(startDate, noOfMonths)).toEqual(expectedResult);
    });
});

describe('when getting relative start', () => {

    test('for the first day of the range', () => {
        const date = new Date('2018-01-01');
        const range = {
            startDate: new Date('2018-01-01'),
            endDate: new Date('2018-01-10')
        };

        const expectedResult = 0;

        expect(getRelativeStart(date, range)).toEqual(expectedResult);
    });

    test('for the last day of the range', () => {
        const date = new Date('2018-01-10');
        const range = {
            startDate: new Date('2018-01-01'),
            endDate: new Date('2018-01-10')
        };

        const expectedResult = 0.9;

        expect(getRelativeStart(date, range)).toEqual(expectedResult);
    });

    test('for a day before the range', () => {
        const date = new Date('2017-12-31');
        const range = {
            startDate: new Date('2018-01-01'),
            endDate: new Date('2018-01-10')
        };

        const expectedResult = -0.1;

        expect(getRelativeStart(date, range)).toEqual(expectedResult);
    });

    test('for a day after the range', () => {
        const date = new Date('2018-01-11');
        const range = {
            startDate: new Date('2018-01-01'),
            endDate: new Date('2018-01-10')
        };
        
        const expectedResult = 1.1;

        expect(getRelativeStart(date, range)).toEqual(expectedResult);
    });


    test('for the mid point', () => {
        const date = new Date('2018-01-06');
        const range = {
            startDate: new Date('2018-01-01'),
            endDate: new Date('2018-01-10')
        };

        const expectedResult = 0.5;

        expect(getRelativeStart(date, range)).toEqual(expectedResult);
    });
});

describe('when getting relative end', () => {

    test('for the first day of the range', () => {
        const date = new Date('2018-01-01');
        const range = {
            startDate: new Date('2018-01-01'),
            endDate: new Date('2018-01-10')
        };

        const expectedResult = 0.1;

        expect(getRelativeEnd(date, range)).toEqual(expectedResult);
    });

    test('for the last day of the range', () => {
        const date = new Date('2018-01-10');
        const range = {
            startDate: new Date('2018-01-01'),
            endDate: new Date('2018-01-10')
        };

        const expectedResult = 1;

        expect(getRelativeEnd(date, range)).toEqual(expectedResult);
    });

    test('for a day before the range', () => {
        const date = new Date('2017-12-31');
        const range = {
            startDate: new Date('2018-01-01'),
            endDate: new Date('2018-01-10')
        };

        const expectedResult = -0.1;

        expect(getRelativeEnd(date, range)).toEqual(expectedResult);
    });

    test('for a day after the range', () => {
        const date = new Date('2018-01-11');
        const range = {
            startDate: new Date('2018-01-01'),
            endDate: new Date('2018-01-10')
        };

        const expectedResult = 1.1;

        expect(getRelativeEnd(date, range)).toEqual(expectedResult);
    });


    test('for the mid point', () => {
        const date = new Date('2018-01-05');
        const range = {
            startDate: new Date('2018-01-01'),
            endDate: new Date('2018-01-10')
        };

        const expectedResult = 0.5;

        expect(getRelativeEnd(date, range)).toEqual(expectedResult);
    });
});
