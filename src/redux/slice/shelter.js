import { createSlice } from "@reduxjs/toolkit";
import { RegionOptions } from "../../components/public/FilterOptions";
import { getShelterData } from "../api/shelterAPI";

const initialState = {
  newLocations: [],
  items: [],
  filteredItems: [],
  center: { lat: 37.54686, lng: 126.95838 },
  loading: false,
  error: null,
  selectedOption: null,
  options: RegionOptions,
};

const shelterSlice = createSlice({
  name: "shelter",
  initialState,
  reducers: {
    setSelectedOption(state, action) {
      state.selectedOption = action.payload;
    },
    setFilteredItems(state, action) {
      state.filteredItems = action.payload;
    },
    setNewLocations(state, action) {
      state.newLocations = action.payload;
    },
    setCenter(state, action) {
      state.center = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getShelterData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getShelterData.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.items = action.payload.items.item;
    });
    builder.addCase(getShelterData.rejected, (state, action) => {
      state.loading = false;
      state.items = [];
      state.error = action.error.message;
    });
  },
});

export default shelterSlice;
