import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_KEY = process.env.REACT_APP_API_KEY;
const REQUEST_URL = `${process.env.REACT_APP_ANIMAL_REQUEST_URL}?serviceKey=${API_KEY}`;
const REQUEST_PARAMS = {
  numOfRows: 32,
  pageNo: 1,
  _type: "json",
};

export const fetchAnimalsData = createAsyncThunk(
  "animal/fetchAnimalsData",
  async ({ pageNo, upkind, upr_cd, neuter_yn }) => {
    const response = await axios.get(REQUEST_URL, {
      params: { ...REQUEST_PARAMS, pageNo, upkind, upr_cd, neuter_yn },
    });
    console.log(response.data.response.body);
    return response.data.response.body;
  }
);
