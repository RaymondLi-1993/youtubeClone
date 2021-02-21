import { DELETE_COMMENT, FETCH_COMMENTS } from "../actions/types";

const INITIAL_STATE = {
  data: [],
};

export const commentReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_COMMENTS:
      return { ...state, data: action.payload };
    case DELETE_COMMENT:
      console.log(action.payload);
      return { ...state, data: action.payload };
    default:
      return state;
  }
};
