import { GET_USERS, SET_USERS } from '../actions/constants';

let defaultState = {
    users: [],
}

function newState(state, payload) {
    return {
      ...state,
      payload,
    };
  }
  

function reducer(state = defaultState, { type, payload}) {
    switch (type) {
        case GET_USERS:
            return newState(state, payload);
        case SET_USERS:
            return payload
        default:
            return state;
    }
}

export default reducer;