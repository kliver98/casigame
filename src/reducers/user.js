import { SET_USER } from '../actions/constants';

let defaultState = {
    fullname: '',
    email: '',
    rol: '',
}


function reducer(state = defaultState, { type, payload}) {
    switch (type) {
        case SET_USER:
            return defaultState;
        default:
            return state;
    }
}

export default reducer;