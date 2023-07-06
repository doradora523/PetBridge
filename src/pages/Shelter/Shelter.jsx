import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Map from "../../components/Shelter/Map";
import Loader from "../../components/Loader/Loader";
import ShelterList from "../../components/Shelter/ShelterList";
import { getShelterData } from "../../redux/api/shelterAPI";
import "./style.scss";

const Shelter = () => {
  const loading = useSelector((state) => state.shelter.loading);
  const dispatch = useDispatch();
  // Get Shelter Items data
  useEffect(() => {
    dispatch(getShelterData());
  }, [dispatch]);

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
