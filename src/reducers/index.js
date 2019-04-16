import {createStore, combineReducers, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {reducer as form} from "redux-form";
import currentUser from "./currentUser";
// The store object that contains all reducers
const reducers = combineReducers({
  currentUser,
  form
});

export default createStore(reducers, applyMiddleware(thunk));
