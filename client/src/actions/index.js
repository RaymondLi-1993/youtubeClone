import Axios from "axios";
import History from "../history";
import {
  SIGN_IN,
  SIGN_OUT,
  ERROR_MESSAGE,
  FETCH_COMMENTS,
  DELETE_COMMENT,
} from "./types";

export const signIn = data => async dispatch => {
  try {
    const response = await Axios.post(`/api/auth`, data);
    if (response.data.errors) {
      dispatch({ type: ERROR_MESSAGE, payload: response.data });
    } else {
      dispatch({ type: SIGN_IN, payload: response.data });
      History.push(`/`);
    }
  } catch (err) {
    console.log(err);
  }
};

export const signOut = () => async dispatch => {
  try {
    const response = await Axios.get(`/api/logout`);
    dispatch({ type: SIGN_OUT });

    History.push(`${response.data.redirect}`);
  } catch (err) {
    console.log(err);
  }
};

export const createUser = data => async dispatch => {
  try {
    const response = await Axios.post(`/api/create`, data);
    console.log(response.data.err);
    if (response.data.err <= 0) {
      const newUser = await Axios.post(`/api/auth`, data);
      await dispatch({ type: SIGN_IN, payload: newUser.data });
      History.push(`/`);
    } else {
      dispatch({ type: ERROR_MESSAGE, payload: response.data.message });
    }
  } catch (err) {
    console.log(err);
  }
};

export const demoRoute = data => async dispatch => {
  try {
    const response = await Axios.post(`/api/demo`, data);
    dispatch({ type: SIGN_IN, payload: response.data });
    return History.push(`/`);
  } catch (err) {
    console.log(err);
  }
};

export const returningUser = data => async dispatch => {
  const { username, id } = data.data;
  try {
    if (username && id) {
      dispatch({ type: SIGN_IN, payload: { username, id } });
    }
  } catch (err) {
    console.log(err);
  }
};

export const fetchComments = () => async dispatch => {
  const response = await Axios.get(`/api/fetchComments`);
  dispatch({ type: FETCH_COMMENTS, payload: response.data.comments });
};

export const postComments = data => async dispatch => {
  await Axios.post(`/api/addcomment`, data);
};

export const deleteComment = data => async (dispatch, getState) => {
  const comments = getState().comments.data;
  const response = await Axios.post(`/api/delete`, data);
  if (response.data.err < 1) {
    let filteredComments = comments.filter(elem => {
      return elem.id !== data.intId;
    });
    dispatch({ type: DELETE_COMMENT, payload: filteredComments });
  } else {
    return;
  }
};

//export const fetchUser = () => {};
