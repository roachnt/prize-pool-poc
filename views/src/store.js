import { createStore } from "redux";
import rootReducer from "./reducers/rootReducer";

const store = createStore(
  rootReducer,
  { user: JSON.parse(localStorage.getItem("user")) },
  window.devToolsExtension && window.devToolsExtension()
);

export default store;
