import { createSlice } from "@reduxjs/toolkit";
import { getAnimalsData } from "../api/animalAPI";

const initialState = {
  items: [],
  openModal: false,
  itemDetails: [],
  location: { lat: null, lng: null },
};
const animalSlice = createSlice({
  name: "animal",
  initialState,
  reducers: {
    setOpenModal(state, action) {
      state.openModal = action.payload;
    },
    getItemDetails(state, action) {
      state.itemDetails = action.payload;
    },
    getLocation(state, action) {
      state.location = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAnimalsData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAnimalsData.fulfilled, (state, action) => {
      state.items = action.payload;
      state.loading = false;
    });
    builder.addCase(getAnimalsData.rejected, (state, action) => {
      state.loading = false;
      state.items = [];
      state.error = action.error.message;
    });
  },
});

export default animalSlice;
