import { combineReducers } from "@reduxjs/toolkit";
import {authReducer} from "./slices/auth/authSlice";

const rootReducer = combineReducers({
  authState: authReducer,
});

export { rootReducer };
