import axios from 'axios';
import {
  PROFILE_CREATE,
  PROFILE_GET,
  PROFILE_SERIES_UPDATE,
  PROFILE_SERIES_CURRENT,
  PROFILE_SERIES_ALL,
  SERIES_UPDATE,
  PROFILE_EPISODES_UPDATE
} from './types';

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

export const getCurrentSeason = () => async dispatch => {
  try {
    const res = await axios.get('/api/series/current');

    dispatch({
      type: PROFILE_SERIES_CURRENT,
      payload: res.data
    });
  } catch (err) {
    const { errors } = err.response.data;

    errors && errors.map(error => dispatch(setAlert(error.msg, 'error', 3000)));
  }
};

export const getAllShows = () => async dispatch => {
  try {
    const res = await axios.get('/api/series/all');

    dispatch({
      type: PROFILE_SERIES_ALL,
      payload: res.data
    });
  } catch (err) {
    const { errors } = err.response.data;

    errors && errors.map(error => dispatch(setAlert(error.msg, 'error', 3000)));
  }
};

export const addProfileSeries = (showUrl, starting) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = {
    showUrl,
    starting
  };

  try {
    const res = await axios.post('/api/profile/series', body, config);

    dispatch({
      type: PROFILE_SERIES_UPDATE,
      payload: res.data
    });
  } catch (err) {
    const { errors } = err.response.data;

    errors && errors.map(error => dispatch(setAlert(error.msg, 'error', 3000)));
  }
};

export const removeProfileSeries = showIds => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = {
    showIds
  };

  try {
    const res = await axios.patch('/api/profile/series', body, config);

    dispatch({
      type: PROFILE_SERIES_UPDATE,
      payload: res.data
    });
  } catch (err) {
    const { errors } = err.response.data;

    errors && errors.map(error => dispatch(setAlert(error.msg, 'error', 3000)));
  }
};

export const getUpdates = () => async dispatch => {
  try {
    const res = await axios.get('/api/series/update');

    dispatch({
      type: SERIES_UPDATE,
      payload: res.data
    });
  } catch (err) {
    const { errors } = err.response.data;

    errors && errors.map(error => dispatch(setAlert(error.msg, 'error', 3000)));
  }
};

export const removeEpisodes = episodes => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = {
    episodes
  };

  try {
    const res = await axios.patch('/api/profile/episodes', body, config);

    dispatch({
      type: PROFILE_EPISODES_UPDATE,
      payload: res.data
    });
  } catch (err) {
    const { errors } = err.response.data;

    errors && errors.map(error => dispatch(setAlert(error.msg, 'error', 3000)));
  }
};
