import React, { useEffect } from "react";
import { GoogleMap, LoadScriptNext, MarkerF } from "@react-google-maps/api";
import { useDispatch, useSelector } from "react-redux";
import shelterSlice from "../../redux/slice/shelter";

const MAP_API_KEY = process.env.REACT_APP_GOOGLE_MAP_API_KEY;

const Map = () => {
  const dispatch = useDispatch();

  const locations = useSelector((state) => state.shelter.locations);
  const center = useSelector((state) => state.shelter.center);

  const centerArray =
    locations &&
    locations.map((location) => [location[0], location[1], location[2]]);


  // Get Center
  useEffect(() => {
    const getCenter = () => {
      if (locations.length > 0) {
        const availableCenterData = locations.filter(
          (location) => location[1] !== "undefined"
        );
        dispatch(shelterSlice.actions.setAvailableCenter(availableCenterData));
        console.log("availableCenter:", availableCenterData);

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

    getCenter();
  }, [locations]);

  return (
    <LoadScriptNext googleMapsApiKey={MAP_API_KEY}>
      <GoogleMap
        zoom={10}
        center={center}
        mapContainerClassName="map-container"
      >
        {centerArray &&
          centerArray.map((spot, index) => (
            <MarkerF
              key={index}
              label={spot[0]}
              position={{ lat: parseFloat(spot[1]), lng: parseFloat(spot[2]) }}
            />
          ))}
      </GoogleMap>
    </LoadScriptNext>
  );
};
export default Map;
