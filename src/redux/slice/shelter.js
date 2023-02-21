import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  locations: [],
  items: [],
  center: { lat: 37.54686, lng: 126.95838 },
  isLoading: false,
};
const shelterSlice = createSlice({
  name: "shelter",
  initialState,
  reducers: {
    getItems(state, action) {
      state.items = action.payload;
    },
    getLocations(state, action) {
      state.locations = action.payload;
    },
    setClickCenter(state, action) {
      state.center = action.payload;
    },
    isLoading(state, action) {
      state.isLoading = action.payload;
    },
  },
});

export default shelterSlice;
