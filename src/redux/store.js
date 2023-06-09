import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { rootReducer } from "./rootReducers";

const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false,
});

 const store = configureStore({
  reducer: rootReducer,
  middleware: customizedMiddleware,
 });
export default store;