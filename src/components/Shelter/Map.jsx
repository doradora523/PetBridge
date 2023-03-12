import React, { memo, useCallback, useEffect, useState } from "react";
import { GoogleMap, LoadScriptNext, MarkerF } from "@react-google-maps/api";
import { useDispatch, useSelector } from "react-redux";
import shelterSlice from "../../redux/slice/shelter";
import Geocode from "react-geocode";

const MAP_API_KEY = process.env.REACT_APP_GOOGLE_MAP_API_KEY;

const containerStyle = {
  width: "700px",
  height: "660px",
  backgroundColor: "lightgray",
};

const Map = () => {
  const dispatch = useDispatch();
  const filteredItems = useSelector((state) => state.shelter.filteredItems);
  const locations = useSelector((state) => state.shelter.locations);
  const center = useSelector((state) => state.shelter.center);
  const availableCenter = useSelector((state) => state.shelter.availableCenter);
  // console.log({ filteredItems });
  // console.log({ locations });

  // Get Center
  const getCenter = () => {
    if (locations.length > 0) {
      const centerData = locations.filter(
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

  // Get LatLng by address
  const geoCoder = () => {
    Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAP_API_KEY);
    Geocode.setLanguage("en");
    Geocode.setRegion("es");
    Geocode.setLocationType("ROOFTOP");
    // Geocode.enableDebug();

    const getLatLng = locations.map((location) => {
      Geocode.fromAddress(location[3])
        .then((response) => {
          const { lat, lng } = response.results[0].geometry.location;

          const results = [
            location[0],
            { lat: parseFloat(lat), lng: parseFloat(lng) },
          ];
          console.log(results);
          return results;
        })
        .catch((error) => console.log(error));
    });

    dispatch(shelterSlice.actions.setAvailableCenter(getLatLng));
    console.log({ availableCenter });
  };

  // Get Locations
  useEffect(() => {
    const locationData = filteredItems.map((spot) => [
      spot.careNm,
      parseFloat(spot.lat),
      parseFloat(spot.lng),
      spot.careAddr,
    ]);

    dispatch(shelterSlice.actions.getLocations(locationData));
  }, [filteredItems]);

  // Get Center
  useEffect(() => {
    getCenter();
    geoCoder();
  }, [locations]);

  return (
    <LoadScriptNext googleMapsApiKey={MAP_API_KEY}>
      <GoogleMap zoom={10} center={center} mapContainerStyle={containerStyle}>
        {locations &&
          locations.map((spot, index) => (
            <MarkerF
              key={index}
              label={spot[0]}
              position={{ lat: spot[1], lng: spot[2] }}
            />
          ))}
      </GoogleMap>
    </LoadScriptNext>
  );
};
export default memo(Map);
