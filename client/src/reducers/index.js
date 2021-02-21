import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { commentReducer } from "./commentsReducer";
import { errorReducer } from "./errorReducer";

export default combineReducers({
  auth: authReducer,
  error: errorReducer,
  comments: commentReducer,
});
