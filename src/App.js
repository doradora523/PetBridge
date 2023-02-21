import axios from "axios";
import { useEffect, useState } from "react";
import { Provider, useDispatch } from "react-redux";
import store from "./redux/store/index";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./style.scss";

import AnouncementPet from "./pages/AnouncementPet";
import Header from "./pages/Header";
import Main from "./pages/Main";
import Shelter from "./pages/Shelter";
import shelterSlice from "./redux/slice/shelter";

const API_KEY = process.env.REACT_APP_API_KEY;
const REQUEST_URL = `${process.env.REACT_APP_REQUEST_URL}?serviceKey=${API_KEY}`;
const REQUEST_PARAMS = {
  numOfRows: 10,
  pageNo: 1,
  _type: "json",
};

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getData = () => {
      axios
        .get(REQUEST_URL, {
          params: REQUEST_PARAMS,
        })
        .then((res) => {
          const data = res.data.response.body.items;
          dispatch(shelterSlice.actions.setItems(data.item));
          dispatch(
            shelterSlice.actions.setLocations(
              data.item.map((spot) => [spot.careNm, spot.lat, spot.lng])
            )
          );
          console.log(data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getData();
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/anouncement" element={<AnouncementPet />} />
          <Route path="/shelter" element={<Shelter />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
