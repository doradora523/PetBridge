import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./style.scss";
import AnnouncementPet from "./pages/AnnouncementPet";
import Header from "./pages/Header";
import Main from "./pages/Main";
import Shelter from "./pages/Shelter";
import CheckList from "./pages/CheckList";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/checklist" element={<CheckList />} />
          <Route path="/announcement" element={<AnnouncementPet />} />
          <Route path="/shelter" element={<Shelter />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
