import React, { createContext, useContext, useReducer } from "react";
import axios from "axios";

import reducer from "../reducer/UserReducer";

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
} from "./actionTypes";

const UserContext = createContext();

const initialState = {
  isAuthenticated: false,
  userId: null,
  loading: false,
  error: null,
  user: null,
  users: [],
};

const UserProvider = ({ children }) => {
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

      // If there is no name input -> set it tod default

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

  return (
    <UserContext.Provider value={{ ...state, register, login, clearError }}>
      {children}
    </UserContext.Provider>
  );
};

const useUserContext = () => {
  return useContext(UserContext);
};

export { UserProvider, useUserContext };
