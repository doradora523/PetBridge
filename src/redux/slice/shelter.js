import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  locations: [],
  items: [],
  filteredItems: [],
  availableCenter: [],
  center: { lat: 37.54686, lng: 126.95838 },
  isLoading: false,
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
    getItems(state, action) {
      state.items = action.payload;
    },
    setFilteredItems(state, action) {
      state.filteredItems = action.payload;
    },
    setAvailableCenter(state, action) {
      state.availableCenter = action.payload;
    },
    getLocations(state, action) {
      state.locations = action.payload;
    },
    setCenter(state, action) {
      state.center = action.payload;
    },
    isLoading(state, action) {
      state.isLoading = action.payload;
    },
    setSelectedOption(state, action) {
      state.selectedOption = action.payload;
    },
  },
});

export default shelterSlice;
