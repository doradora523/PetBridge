import { createSlice } from "@reduxjs/toolkit";
import { getShelterData } from "../api/shelterAPI";

const initialState = {
  newLocations: [],
  items: [],
  filteredItems: [],
  center: { lat: 37.54686, lng: 126.95838 },
  loading: false,
  error: null,
  selectedOption: null,
  options: [
    { value: "서울특별시" },
    { value: "경기도" },
    { value: "강원도" },
    { value: "충청북도" },
    { value: "충청남도" },
    { value: "전라북도" },
    { value: "전라남도" },
    { value: "경상북도" },
    { value: "경상남도" },
    { value: "부산광역시" },
    { value: "인천광역시" },
    { value: "대구광역시" },
    { value: "대전광역시" },
    { value: "광주광역시" },
    { value: "울산광역시" },
    { value: "세종특별자치시" },
    { value: "제주특별자치도" },
  ],
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
