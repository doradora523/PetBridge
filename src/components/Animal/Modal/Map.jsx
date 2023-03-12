import React from "react";
import { GoogleMap, LoadScriptNext, MarkerF } from "@react-google-maps/api";
import { useSelector } from "react-redux";

const MAP_API_KEY = process.env.REACT_APP_GOOGLE_MAP_API_KEY;

const Map = () => {
  const location = useSelector((state) => state.animal.location);
  const center = {
    lat: parseFloat(location.lat),
    lng: parseFloat(location.lng),
  };
  return (
    <LoadScriptNext googleMapsApiKey={MAP_API_KEY}>
      <GoogleMap
        zoom={14}
        center={center}
        mapContainerClassName="map-container"
      >
        <MarkerF position={center} />
      </GoogleMap>
    </LoadScriptNext>
  );
};

export default Map;
