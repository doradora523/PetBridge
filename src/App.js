import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./style.scss";
import { useEffect } from "react";
import AnnouncementPet from "./pages/AnnouncementPet";
import Header from "./pages/Header";
import Main from "./pages/Main";
import Shelter from "./pages/Shelter";
import Loader from "./components/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";

import { getShelterData } from "../src/redux/api/shelterAPI";

const App = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.shelter.loading);

  // Get Items data
  useEffect(() => {
    dispatch(getShelterData());
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/announcement" element={<AnnouncementPet />} />
          <Route path="/shelter" element={loading ? <Loader /> : <Shelter />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
