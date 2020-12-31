import { SET_USERS, GET_USERS, API_BASE } from './constants';
import axios from 'axios'

export function getUsers() {
  const request = axios.get(API_BASE+"/users")
  return {
    type: GET_USERS,
    payload: request
  };
}

export function setUsers(users) {
    return {
      type: SET_USERS,
      users,
    };
}