import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
};

const animalSlice = createSlice({
  name: "animal",
  initialState,
  reducers: {
    getData(state, action) {
      state.data = action.payload;
    },
  },
});

export default animalSlice;
