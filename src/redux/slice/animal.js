import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  openModal: false,
};

const animalSlice = createSlice({
  name: "animal",
  initialState,
  reducers: {
    getAnimalItems(state, action) {
      state.items = action.payload;
    },
    setOpenModal(state, action) {
      state.openModal = action.payload;
    },
  },
});

export default animalSlice;
