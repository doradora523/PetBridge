import { combineReducers } from "@reduxjs/toolkit";
import shelterSlice from "../slice/shelter";

const rootReducer = combineReducers({
  shelter: shelterSlice.reducer,
});

export default rootReducer;
