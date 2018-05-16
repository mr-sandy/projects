import moment from 'moment';
import { range } from 'underscore';

// moment's startOf('month') and endOf('month') seem to have DST issues I can't resolve.  Using moment.utc() instead.
// startDate: date.startOf('month').toDate(), //DOESN'T WORK FOR 01/10/2018
// endDate: date.endOf('month').toDate(), //DOESN'T WORK FOR 01/03/2018
const firstOfMonth = date => moment.utc()
    .year(date.year())
    .month(date.month())
    .date(1)
    .hour(0)
    .minute(0)
    .second(0)
    .millisecond(0)
    .toDate();

const lastOfMonth = date => moment.utc()
    .year(date.year())
    .month(date.month())
    .date(date.endOf('month').date())
    .hour(0)
    .minute(0)
    .second(0)
    .millisecond(0)
    .toDate();

export const getMonths = (startDate, noOfMonths) => {
    return range(noOfMonths)
        .map(i => moment(startDate).add(i, 'months'))
        .map(date => ({
            month: date.month() + 1,
            year: date.year(),
            startDate: firstOfMonth(date),
            endDate: lastOfMonth(date),
            daysInMonth: date.daysInMonth()
        }));
};

export const getRelativeStart = (date, { startDate, endDate }) => {
    const mDate = moment(date).startOf('day');
    const mStartDate = moment(startDate).startOf('day');
    const mEndDate = moment(endDate).startOf('day');

    const start = mDate.diff(mStartDate, 'days');
    const duration = mEndDate.diff(mStartDate, 'days') + 1;

    if (mDate < mStartDate) {
        return -0.1;
    }

    if (mDate > mEndDate) {
        return 1.1;
    }

    return start / duration;
};

export const getRelativeEnd = (date, { startDate, endDate }) => {
    const mDate = moment(date).startOf('day');
    const mStartDate = moment(startDate).startOf('day');
    const mEndDate = moment(endDate).startOf('day');

    const end = mDate.diff(mStartDate, 'days') + 1;
    const duration = mEndDate.diff(mStartDate, 'days') + 1;

    if (mDate < mStartDate) {
        return -0.1;
    }

    if (mDate > mEndDate) {
        return 1.1;
    }

    return end / duration;
};

export const rangesOverlap = (range1, range2) => {
    return ((range1.startDate < range2.startDate && range1.endDate > range2.startDate) ||
        (range1.startDate >= range2.startDate && range1.endDate <= range2.endDate) ||
        (range1.startDate < range2.endDate && range1.endDate > range2.endDate));
}