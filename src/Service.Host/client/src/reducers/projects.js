import * as actionTypes from '../actions';

const projects = (prevState = [], action) => {
    switch (action.type) {
        case actionTypes.RECEIVE_PROJECT:
            {
                const index = prevState.findIndex(p => p.id === action.payload.id);

                return index > -1
                    ? [...prevState]
                    : [...prevState, action.payload];
            }

        default:
            return prevState;
    }
}
export default projects;