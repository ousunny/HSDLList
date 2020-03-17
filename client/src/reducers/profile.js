import { PROFILE_CREATE, PROFILE_GET } from '../actions/types';

const initialState = {
  profile: null,
  loading: true
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case PROFILE_CREATE:
    case PROFILE_GET:
      return {
        ...state,
        profile: payload,
        loading: false
      };
    default:
      return state;
  }
}
