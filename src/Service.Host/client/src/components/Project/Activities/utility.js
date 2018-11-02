import { getStatusDisplayName } from '../../utility';
import moment from 'moment';

export const sortActivitiesMostRecentFirst = (a, b) => {
    if (a.activityDate < b.activityDate)
        return 1;
    else if (a.activityDate > b.activityDate)
        return -1;
    else
        return 0;
};

export const getActivityDescription = activity => {
    switch (activity.type) {
        case 'create':
            return 'created the project';

        case 'update':
            return 'updated the project';

        case 'add-phase':
            return `added phase ${activity.phaseNumber}`;

        case 'update-phase':
            return `updated phase ${activity.phaseNumber}`;

        case 'remove-phase':
            return `removed phase ${activity.phaseNumber}`;

        default:
            return false;
    }
};

export const getActivityDetails = activity => {
    switch (activity.type) {
    case 'create':
        return [
            {
                key: 'Name',
                value: activity.name
            },
            {
                key: 'Start Date',
                value: moment(activity.startDate).format('Do MMM YYYY')
            }
        ];

    case 'update':
        return [
            {
                key: 'Name',
                value: activity.name,
                previousValue: activity.previousName
            },
            {
                key: 'Start Date',
                value: moment(activity.startDate).format('Do MMM YYYY'),
                previousValue: moment(activity.previousStartDate).format('Do MMM YYYY')
            }
        ];

    case 'add-phase':
        return [
            {
                key: 'Status',
                value: getStatusDisplayName(activity.status)
            },
            {
                key: 'End Date',
                value: moment(activity.endDate).format('Do MMM YYYY')
            }
        ];

    case 'update-phase':
        return [
            {
                key: 'Status',
                value: getStatusDisplayName(activity.status),
                previousValue: getStatusDisplayName(activity.previousStatus)
            },
            {
                key: 'End Date',
                value: moment(activity.endDate).format('Do MMM YYYY'),
                previousValue: moment(activity.previousEndDate).format('Do MMM YYYY')
            }
        ];

    case 'remove-phase':
    default:
        return [];
    }
}
