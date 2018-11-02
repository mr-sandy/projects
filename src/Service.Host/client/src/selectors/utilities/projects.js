import moment from 'moment';
import { rangesOverlap } from './date';

export const getProjectDateRange = project => {
    const startDate = moment(project.startDate).add(-1, 'months').startOf('month');
    const endDate = moment.max(project.phases.map(p => moment(p.endDate))).add(1, 'months').endOf('month');
    const noOfMonths = endDate.diff(startDate, 'months') + 1;

    return {
        startDate: startDate.toDate(),
        endDate: endDate.toDate(),
        noOfMonths
    };
}

export const projectFilter = dateRange => project => rangesOverlap(dateRange, getProjectDateRange(project));

export const projectComparison = (a, b) => getProjectDateRange(a).startDate - getProjectDateRange(b).startDate;

