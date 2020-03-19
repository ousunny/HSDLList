import {
  PROFILE_CREATE,
  PROFILE_GET,
  PROFILE_SERIES_UPDATE,
  PROFILE_SERIES_CURRENT,
  PROFILE_SERIES_ALL
} from '../actions/types';

const initialState = {
  profile: null,
  shows: [],
  loading: true
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case PROFILE_CREATE:
    case PROFILE_GET:
    case PROFILE_SERIES_UPDATE:
      return {
        ...state,
        profile: payload,
        loading: false
      };
    case PROFILE_SERIES_CURRENT:
    case PROFILE_SERIES_ALL:
      return {
        ...state,
        shows: payload,
        loading: false
      };
    default:
      return state;
  }
}
