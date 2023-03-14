import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader/Loader";
import List from "../components/Shelter/List";
import Map from "../components/Shelter/Map";
import { getShelterData } from "../redux/api/shelterAPI";

const Shelter = () => {
  const loading = useSelector((state) => state.shelter.loading);
  const dispatch = useDispatch();
  // Get Shelter Items data
  useEffect(() => {
    dispatch(getShelterData());
  }, []);

  return (
    <div className="container">
      <div className="center">
        {loading ? (
          <Loader />
        ) : (
          <>
            <List />
            <Map />
          </>
        )}
      </div>
    </div>
  );
};

export default Shelter;
