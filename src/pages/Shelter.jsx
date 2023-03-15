import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader/Loader";
import Map from "../components/Shelter/Map";
import ShelterList from "../components/Shelter/ShelterList";
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
            <ShelterList />
            <Map />
          </>
        )}
      </div>
    </div>
  );
};

export default Shelter;
