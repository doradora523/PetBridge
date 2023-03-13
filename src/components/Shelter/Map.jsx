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
  const [undefinedArray, setUndefinedArray] = useState([]);

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

  // 주소값으로 좌표 받아오기
  const geoCoder = () => {
    const getLatLng = undefinedArray.map((item) => {
      Geocode.setApiKey(MAP_API_KEY);
      Geocode.setLanguage("en");
      Geocode.setRegion("es");
      Geocode.setLocationType("ROOFTOP");
      // Geocode.enableDebug();
      return Geocode.fromAddress(item[3])
        .then((response) => {
          const { lat, lng } = response.results[0].geometry.location;
          const result = [item[0], lat, lng];
          return result;
        })
        .catch((error) => console.log(error));
    });
    console.log(getLatLng);
  };

  // Get Locations (센터명, 위도, 경도, 주소)
  useEffect(() => {
    const locations = filteredItems.map((item) => [
      item.careNm,
      parseFloat(item.lat),
      parseFloat(item.lng),
      item.careAddr,
    ]);
    dispatch(shelterSlice.actions.getLocations(locations));
  }, [filteredItems]);

  // Get Center
  useEffect(() => {
    getCenter();

    // 위도와 경도가 NaN 인 배열
    const undefinedLatLng = locations.filter((item) =>
      Number.isNaN(item[1] || item[2])
    );

    setUndefinedArray(undefinedLatLng);

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
