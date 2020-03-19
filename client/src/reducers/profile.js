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
        shows: payload.filter(
          show =>
            !state.profile.series.find(
              profileShow =>
                profileShow.title.replace(/\u2013|\u2014/g, '-') ===
                show.title.replace(/\u2013|u2014/g, '-')
            )
        ),
        loading: false
      };
    default:
      return state;
  }
}
