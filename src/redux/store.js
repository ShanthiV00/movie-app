import MovieReducers from "./reducer";
import { createStore } from "redux";

/** Create redux store */
const store = createStore(MovieReducers);

export default store;
