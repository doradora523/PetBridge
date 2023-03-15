import { createSlice } from "@reduxjs/toolkit";
import RegionOptions from "../../components/public/RegionOptions";
import { fetchAnimalsData } from "../api/animalAPI";

const initialState = {
  data: [],
  items: [],
  openModal: false,
  itemDetails: [],
  location: { lat: null, lng: null },
  status: "idle",
  error: null,
  currentPage: 1,
  pageCount: 1,
  perPage: 32,
  loading: false,
  favorites: [],
  filteredItems: [],
  type: [{ value: "개" }, { value: "고양이" }, { value: "기타" }],
  region: RegionOptions,
  selectedRegion: [],
  selectedType: [],
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
    setFilteredItems(state, action) {
      state.filteredItems = action.payload;
    },
    setSelectedRegion(state, action) {
      state.selectedRegion = action.payload;
    },
    setSelectedType(state, action) {
      state.selectedType = action.payload;
    },
    setPage(state, action) {
      state.currentPage = action.payload;
    },
    setFavorites(state, action) {
      state.favorites = [...state.favorites, action.payload];
    },
    removeFavorites(state, action) {
      state.favorites = state.favorites.filter(
        (item) => item !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAnimalsData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAnimalsData.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.items = action.payload.items.item;
      state.pageCount = Math.ceil(action.payload.totalCount / state.perPage);
    });
    builder.addCase(fetchAnimalsData.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export const { setOpenModal, getItemDetails, getLocation, setPage } =
  animalSlice.actions;

export default animalSlice;
