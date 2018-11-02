import * as actionTypes from '../actions';

const employees = (prevState = [], action) => {
    switch (action.type) {

        case actionTypes.EMPLOYEE_REQUESTED:
            return [
                ...prevState,
                {
                    employeeUrl: action.payload.employeeUrl,
                    loading: true,
                    item: null
                }
            ];

        case actionTypes.EMPLOYEE_RECEIVED:
            {
                const index = prevState.findIndex(p => p.employeeUrl === action.payload.employeeUrl);

                return [
                    ...prevState.slice(0, index),
                    {
                        employeeUrl: action.payload.employeeUrl,
                        loading: false,
                        item: action.payload.data
                    },
                    ...prevState.slice(index + 1)
                ]
            }

        default:
            return prevState;
    }
}
export default employees;