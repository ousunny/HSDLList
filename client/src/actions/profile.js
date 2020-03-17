import axios from 'axios';
import { PROFILE_CREATE, PROFILE_GET } from './types';

import { setAlert } from './alert';

import setAuthToken from '../utils/setAuthToken';

export const createProfile = () => async dispatch => {
  localStorage.token && setAuthToken(localStorage.token);

  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.post('/api/profile', config);

    dispatch({
      type: PROFILE_CREATE,
      payload: res.data
    });
  } catch (err) {
    const { errors } = err.response.data;

    errors && errors.map(error => dispatch(setAlert(error.msg, 'error', 3000)));
  }
};

export const getProfile = () => async dispatch => {
  try {
    const res = await axios.get('/api/profile/me');

    dispatch({
      type: PROFILE_GET,
      payload: res.data
    });
  } catch (err) {
    const { errors } = err.response.data;

    errors && errors.map(error => dispatch(setAlert(error.msg, 'error', 3000)));
  }
};
