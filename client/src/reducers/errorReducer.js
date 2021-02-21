import { ERROR_MESSAGE } from "../actions/types";

const INITIAL_STATE = {
  message: ``,
};

export const errorReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ERROR_MESSAGE:
      return { ...state, message: action.payload } || false;
    default:
      return state;
  }
};
