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
  GET_MY_PROFILE_REQUEST,
  GET_MY_PROFILE_SUCCESS,
  GET_MY_PROFILE_FAIL,
} from "../context/actionTypes";

const userReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_REGISTER_REQUEST:
      return { ...state, loading: true, error: null };
    case USER_REGISTER_SUCCESS:
      localStorage.setItem("ws-token", payload.token);
      localStorage.setItem("ws-userId", payload.userId);
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        token: payload.token,
        userId: payload.userId,
        error: null,
      };
    case USER_REGISTER_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case USER_LOGIN_REQUEST:
      return { ...state, loading: true, error: null };
    case USER_LOGIN_SUCCESS:
      localStorage.setItem("ws-token", payload.token);
      localStorage.setItem("ws-userId", payload.userId);
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        token: payload.token,
        userId: payload.userId,
        error: null,
      };
    case USER_LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case CLEAR_ERROR:
      return { ...state, error: null };
    case GET_MY_PROFILE_REQUEST:
      return { ...state, loading: true, error: null };
    case GET_MY_PROFILE_SUCCESS:
      return { ...state, loading: false, error: null, profile: payload };
    case GET_MY_PROFILE_FAIL:
      return { ...state, loading: false, error: payload };
    default:
      return state;
  }
};

export default userReducer;
