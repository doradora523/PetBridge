import { configureStore } from "@reduxjs/toolkit";
import animalSlice from "../slice/animal";
import shelterSlice from "../slice/shelter";

const store = configureStore({
  reducer: {
    shelter: shelterSlice,
    animal: animalSlice,
  },
});

export default store;
