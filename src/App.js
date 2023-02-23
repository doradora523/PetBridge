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
  numOfRows: 50,
  pageNo: 1,
  _type: "json",
};

const App = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.shelter.isLoading);

  let selectedOption = useSelector((state) => state.shelter.selectedOption);

  useEffect(() => {
    dispatch(shelterSlice.actions.isLoading(true));
    const getData = () => {
      axios
        .get(REQUEST_URL, { params: REQUEST_PARAMS })
        .then((res) => {
          const data = res.data.response.body.items.item;

          dispatch(shelterSlice.actions.isLoading(false));
          dispatch(shelterSlice.actions.getItems(data));
          dispatch(
            shelterSlice.actions.getLocations(
              data.map((spot) => [spot.careNm, spot.lat, spot.lng])
            )
          );

          const filteredData = data.filter(
            (data) => data.orgNm.split(" ")[0] === selectedOption
          );
          console.log(filteredData);
          dispatch(shelterSlice.actions.setFilteredItems(filteredData));
        })
        .catch((error) => {
          console.log("getData Error :", error);
        });
    };
    getData();
  }, [selectedOption]);

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
