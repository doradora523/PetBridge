import { combineReducers } from "@reduxjs/toolkit";
import animalSlice from "../slice/animal";
import shelterSlice from "../slice/shelter";

const rootReducer = combineReducers({
  shelter: shelterSlice.reducer,
  animal: animalSlice.reducer,
});

export default rootReducer;
