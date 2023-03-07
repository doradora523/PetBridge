import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./style.scss";

import AnnouncementPet from "./pages/AnnouncementPet";
import Header from "./pages/Header";
import Main from "./pages/Main";
import Shelter from "./pages/Shelter";
import Loader from "./components/Loader/Loader";
import { useSelector } from "react-redux";

const App = () => {
  const isLoading = useSelector((state) => state.shelter.isLoading);

  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/announcement" element={<AnnouncementPet />} />
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
