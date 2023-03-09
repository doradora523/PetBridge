import { useSelector } from "react-redux";
import Loader from "../components/Loader/Loader";
import List from "../components/Shelter/List";
import Map from "../components/Shelter/Map";

const Shelter = () => {
  return (
    <div className="container">
      <div className="center">
        <List />
        <Map />
      </div>
    </div>
  );
};

export default Shelter;
