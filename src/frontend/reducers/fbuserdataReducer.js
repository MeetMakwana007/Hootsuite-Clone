import { FB_USERDATA } from "../actions/type";

const initialState = {
  user: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FB_USERDATA:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};
