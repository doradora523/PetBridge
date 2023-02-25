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
  const selectedOption = useSelector((state) => state.shelter.selectedOption);
  const locations = useSelector((state) => state.shelter.locations);
  const center = useSelector((state) => state.shelter.center);

  console.log("center", center);
  useEffect(() => {
    const getShelterData = async () => {
      try {
        dispatch(shelterSlice.actions.isLoading(true));
        const response = await axios.get(REQUEST_URL, {
          params: REQUEST_PARAMS,
        });
        const data = response.data.response.body.items.item;
        const filteredData = await data.filter(
          (data) => data.orgNm.split(" ")[0] === selectedOption
        );

        dispatch(shelterSlice.actions.getItems(data));
        dispatch(shelterSlice.actions.setFilteredItems(filteredData));
        dispatch(
          shelterSlice.actions.getLocations(
            filteredData.map((spot) => [spot.careNm, spot.lat, spot.lng])
          )
        );
        const availableCenter = locations.filter(
          (location) => location[1] !== undefined
        );
        dispatch(
          shelterSlice.actions.setCenter({
            lat: availableCenter[0][1],
            lng: availableCenter[0][2],
          })
        );
      } catch (error) {
        console.log("getData Error :", error);
      } finally {
        dispatch(shelterSlice.actions.isLoading(false));
      }
    };
    getShelterData();
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
