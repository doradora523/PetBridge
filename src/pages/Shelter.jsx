import { useSelector } from "react-redux";
import Loader from "../components/Loader/Loader";
import List from "../components/Map/List";
import Map from "../components/Map/Map";

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
