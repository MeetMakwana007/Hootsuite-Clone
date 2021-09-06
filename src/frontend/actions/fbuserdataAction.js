import { FB_USERDATA } from "./type";

export const fbUserData = (response) => {
  return (dispatch) => {
    dispatch({
      type: FB_USERDATA,
      payload: response,
    });
  };
};
