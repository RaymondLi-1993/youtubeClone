import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { loadState, saveState } from "./localstorage/localstorage";
import reduxThunk from "redux-thunk";
import Reducers from "./reducers";
import "./tailwind.output.css";

const persistedState = loadState();

const STORE = createStore(
  Reducers,
  persistedState,
  applyMiddleware(reduxThunk)
);

console.log(persistedState);

STORE.subscribe(() => {
  saveState(
    STORE.getState({
      auth: STORE.getState().auth,
    })
  );
});

ReactDOM.render(
  <Provider store={STORE}>
    <App />
  </Provider>,
  document.getElementById("root")
);
