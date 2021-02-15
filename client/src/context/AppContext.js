import React, { createContext, useContext, useReducer } from "react";
import axios from "axios";

import reducer from "../reducer/AppReducer";

import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_LOGOUT,
  CLEAR_ERROR,
  USERS_GET_REQUEST,
  USERS_GET_SUCCESS,
  USERS_GET_FAIL,
  UPLOAD_AVATAR_REQUEST,
  UPLOAD_AVATAR_SUCCESS,
  UPLOAD_AVATAR_FAIL,
  GET_MY_PROFILE_REQUEST,
  GET_MY_PROFILE_SUCCESS,
  GET_MY_PROFILE_FAIL,
} from "./actionTypes";

const AppContext = createContext();

const initialState = {
  isAuthenticated: false,
  userId: null,
  loading: false,
  error: null,
  user: null,
  users: [],
  profile: null,
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  //// SIGN UP
  const register = async (formData) => {
    dispatch({ type: USER_REGISTER_REQUEST });
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/users/register",
        formData,
        config
      );

      dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
    } catch (err) {
      // Error: err.response.data.message
      console.log("ERR.MSG", err.response);
      dispatch({
        type: USER_REGISTER_FAIL,
        payload:
          err.response && err.response.data.msg
            ? err.response.data.msg
            : err.response,
      });
    }
  };

  //// LOGIN
  const login = async (formData) => {
    dispatch({ type: USER_LOGIN_REQUEST });
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post("/api/auth", formData, config);

      dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
    } catch (err) {
      // Error: err.response.data.message
      console.log("ERR.MSG", err.response);
      dispatch({
        type: USER_LOGIN_FAIL,
        payload:
          err.response && err.response.data.msg
            ? err.response.data.msg
            : err.response,
      });
    }
  };

  const clearError = () => {
    dispatch({ type: CLEAR_ERROR });
  };

  // Upload avatar
  const uploadAvatarPhoto = async (avatarData) => {
    console.log("hehe", typeof avatarData);
    dispatch({ type: UPLOAD_AVATAR_REQUEST });
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjAyNDdkZmMyMjFkNTkxYzY4NTJmOWVmIn0sImlhdCI6MTYxMzMxMDg5NiwiZXhwIjoxNjEzMzk3Mjk2fQ.FgJWRrh3nm6E-RISfPxUmtdTSBI50AVO09v-hYZs6q4",
        },
      };

      const { data } = await axios.post(
        "/api/profile/upload-avatar",
        { photoData: avatarData },
        config
      );

      console.log("123", data);

      dispatch({ type: UPLOAD_AVATAR_SUCCESS, payload: data });
    } catch (err) {
      // Error: err.response.data.message
      console.log("ERR.MSG", err.response);
      dispatch({
        type: UPLOAD_AVATAR_FAIL,
        payload:
          err.response && err.response.data.msg
            ? err.response.data.msg
            : err.response,
      });
    }
  };

  // Get my profile
  const getMyProfile = async () => {
    dispatch({ type: GET_MY_PROFILE_REQUEST });
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjAyNDdkZmMyMjFkNTkxYzY4NTJmOWVmIn0sImlhdCI6MTYxMzMxMDg5NiwiZXhwIjoxNjEzMzk3Mjk2fQ.FgJWRrh3nm6E-RISfPxUmtdTSBI50AVO09v-hYZs6q4",
        },
      };

      const { data } = await axios.get("/api/profile", config);

      dispatch({ type: GET_MY_PROFILE_SUCCESS, payload: data });
    } catch (err) {
      // Error: err.response.data.message
      console.log("ERR.MSG", err.response);
      dispatch({
        type: GET_MY_PROFILE_FAIL,
        payload:
          err.response && err.response.data.msg
            ? err.response.data.msg
            : err.response,
      });
    }
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        register,
        login,
        clearError,
        uploadAvatarPhoto,
        getMyProfile,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, useAppContext };
