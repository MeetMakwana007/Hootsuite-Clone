import {
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGOUT,
  USER_LOADED,
} from "../actions/type";

const initialState = {
  user: {},
  loading: true,
  auth: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_START:
      state = {
        ...state,
        loading: true,
        auth: false,
        user: {},
      };
      break;

    case LOGIN_SUCCESS:
    case USER_LOADED:
      state = {
        ...state,
        user: action.payload,
        auth: true,
        loading: false,
      };
      break;

    case LOGOUT:
      state = {
        ...state,
        user: {},
        auth: false,
        loading: false,
      };
      break;

    default:
      break;
  }

  return state;
};
