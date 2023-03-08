import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_KEY = process.env.REACT_APP_API_KEY;
const REQUEST_URL = `${process.env.REACT_APP_SHELTER_REQUEST_URL}?serviceKey=${API_KEY}`;
const REQUEST_PARAMS = {
  numOfRows: 50,
  pageNo: 1,
  _type: "json",
};

export const getShelterData = createAsyncThunk(
  "shelter/getShelterData",
  async () => {
    const response = await axios.get(REQUEST_URL, {
      params: REQUEST_PARAMS,
    });
    const data = response.data.response.body.items.item;
    return data;
  }
);
