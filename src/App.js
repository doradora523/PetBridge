import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./style.scss";

import AnouncementPet from "./pages/AnouncementPet";
import Header from "./pages/Header";
import Main from "./pages/Main";
import Shelter from "./pages/Shelter";
import shelterSlice from "./redux/slice/shelter";
import Loader from "./components/Loader/Loader";

const API_KEY = process.env.REACT_APP_API_KEY;
const REQUEST_URL = `${process.env.REACT_APP_REQUEST_URL}?serviceKey=${API_KEY}`;
const REQUEST_PARAMS = {
  numOfRows: 20,
  pageNo: 1,
  _type: "json",
};

const App = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.shelter.isLoading);

  useEffect(() => {
    dispatch(shelterSlice.actions.isLoading(true));
    const getData = () => {
      axios
        .get(REQUEST_URL, {
          params: REQUEST_PARAMS,
        })
        .then((res) => {
          dispatch(shelterSlice.actions.isLoading(false));
          const data = res.data.response.body.items;
          dispatch(shelterSlice.actions.getItems(data.item));
          dispatch(
            shelterSlice.actions.getLocations(
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
          <Route
            path="/shelter"
            element={isLoading ? <Loader /> : <Shelter />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
