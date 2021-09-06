import axios from "../axios";
import { useHistory } from "react-router-dom";
import {
  USER_LOADED,
  LOGIN_SUCCESS,
  LOGIN_START,
  LOGOUT,
} from "../actions/type";


export const login = (email) => async (dispatch) => {
  try {
    dispatch({
      type: LOGIN_START,
    });
    const headers = {
      "content-type": "application/json",
    };
    const body = {
      email,
    };
    const res = await axios.post("/login", body, headers);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data.user,
    });
    localStorage.setItem("setKey", res.data.tokenData);
  } catch (err) {
    console.log("err:", err);
  }
};

export const logout = () => async (dispatch) => {
  
  dispatch({
    type: LOGOUT,
  });
  localStorage.clear();
  
};

export const loadUser = () => async (dispatch) => {
  const token = localStorage.getItem("setKey");
  try {
    const res = await axios.get("/api/auth", {
      headers: { Authorization: `${token}` },
    });
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    // dispatch({
    //      type: AUTH_ERROR
    //});
  }
};
