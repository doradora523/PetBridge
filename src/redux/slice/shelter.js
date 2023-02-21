import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  locations: [],
  items: [],
};
const shelterSlice = createSlice({
  name: "shelter",
  initialState,
  reducers: {
    setLocations(state, action) {
      state.locations = action.payload.locations;
    },
    setItems(state, action) {
      state.items = action.payload.items;
    },
  },
});

export default shelterSlice;
