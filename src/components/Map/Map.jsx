import React from "react";
import { GoogleMap, LoadScriptNext, MarkerF } from "@react-google-maps/api";
import { useSelector } from "react-redux";
import { IoPawSharp } from "react-icons/io5";
const MAP_API_KEY = process.env.REACT_APP_GOOGLE_MAP_API_KEY;

function Map() {
  const locations = useSelector((state) => state.shelter.locations);
  const center = useSelector((state) => state.shelter.center);
  const centerArray =
    locations &&
    locations.map((location) => [location[0], location[1], location[2]]);
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
}
export default Map;
