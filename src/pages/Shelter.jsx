import axios from "axios";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import shelterSlice from "../redux/slice/shelter";
import List from "../components/Map/List";
import Map from "../components/Map/Map";
import { getShelterData } from "./api/shelterAPI";

const Shelter = () => {
  const dispatch = useDispatch();
  const selectedOption = useSelector((state) => state.shelter.selectedOption);
  const locations = useSelector((state) => state.shelter.locations);
  const items = useSelector((state) => state.shelter.items);
  const filteredItems = useSelector((state) => state.shelter.filteredItems);
  const availableCenter = useSelector((state) => state.shelter.availableCenter);

  const getCenter = () => {
    if (locations.length > 0) {
      const availableCenterData = locations.filter(
        (location) => location[1] !== "undefined"
      )
      dispatch(shelterSlice.actions.setAvailableCenter(availableCenterData))
      console.log("availableCenter:" , availableCenterData);

      const centerData = availableCenterData.filter(
        (center) => center[1] && center[2] !== "null"
      );
      dispatch(
        shelterSlice.actions.setCenter({
          lat: centerData[0][1],
          lng: centerData[0][2],
        })
      );
    }
  };

  // Get Items data
  useEffect(() => {
    // dispatch(shelterSlice.actions.isLoading(true));
    getShelterData().then((data) => {
      dispatch(shelterSlice.actions.getItems(data));
      console.log(data);
      dispatch(shelterSlice.actions.isLoading(false));
    });
  }, []);

  // Get Filtered Items
  useEffect(() => {
    const filteredData = items.filter(
      (item) => item.orgNm.split(" ")[0] === selectedOption
    );
    dispatch(shelterSlice.actions.setFilteredItems(filteredData));
  }, [selectedOption]);

  // Get Locations
  useEffect(() => {
    const locationData = filteredItems.map((spot) => [
      spot.careNm,
      spot.lat,
      spot.lng,
    ]);
    dispatch(shelterSlice.actions.getLocations(locationData));
  }, [filteredItems]);

  // Get Center
  useEffect(() => {
    getCenter();
  }, [locations]);

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
