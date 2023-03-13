import React, { useEffect, useState } from "react";
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
  const locationsData = useSelector((state) => state.shelter.locationsData);
  const center = useSelector((state) => state.shelter.center);
  const geoLocations = useSelector((state) => state.shelter.geoLocations);
  const newLocations = useSelector((state) => state.shelter.newLocations);
  const [undefinedArray, setUndefinedArray] = useState([]);

  useEffect(() => {
    console.log({ filteredItems });
    console.log({ locationsData });
    console.log({ undefinedArray });
    console.log({ geoLocations });
    console.log({ newLocations });
    console.log("rendering...");
  });

  useEffect(() => {
    if (!filteredItems) return; // 필터링 대상이 없으면 무시

    // Get Locations (센터명, 위도, 경도, 주소)
    const filteredLocationsData = filteredItems.map((item) => [
      item.careNm,
      parseFloat(item.lat),
      parseFloat(item.lng),
      item.careAddr,
    ]);

    dispatch(shelterSlice.actions.getLocationsData(filteredLocationsData));
  }, [filteredItems]);

  useEffect(() => {
    if (!locationsData) return; // locationsData가 없으면 무시
    // 위도와 경도가 NaN 인 배열
    const undefinedLatLng = locationsData.filter(
      (item) => Number.isNaN(item[1]) || Number.isNaN(item[2])
    );

    setUndefinedArray(undefinedLatLng);
  }, [locationsData]);

  useEffect(() => {
    // 주소값으로 좌표 받아오기
    const geoCoder = async () => {
      try {
        const getLatLng = await Promise.all(
          undefinedArray.map((item) => {
            Geocode.setApiKey(MAP_API_KEY);
            Geocode.setLanguage("en");
            Geocode.setRegion("es");
            Geocode.setLocationType("ROOFTOP");
            // Geocode.enableDebug();

            return Geocode.fromAddress(item[3])
              .then((response) => {
                const { lat, lng } = response.results[0].geometry.location;
                const result = [
                  item[0],
                  parseFloat(lat),
                  parseFloat(lng),
                  item[3],
                ];
                return result;
              })
              .catch((error) => {
                console.log(error);
                return null;
              });
          })
        );

        // 필터링된 결과가 없는 경우 빈 배열 반환
        const filteredLatLng = getLatLng.filter((item) => item !== null);
        dispatch(shelterSlice.actions.setGeoLocations(filteredLatLng));
      } catch (error) {
        console.log(error);
      }
    };

    if (undefinedArray.length > 0) {
      geoCoder();
    }
  }, [undefinedArray]);

  useEffect(() => {
    // filter된 locations와 geoLocations의 배열을 새로운 변수에 담아주기
    const newLocationsData = locationsData
      .filter((item) => !Number.isNaN(item[1] || item[2]))
      .concat(geoLocations);

    dispatch(shelterSlice.actions.setNewLocations(newLocationsData));
  }, [geoLocations]);

  // Get Center
  useEffect(() => {
    const getCenter = () => {
      if (newLocations.length > 0) {
        dispatch(
          shelterSlice.actions.setCenter({
            lat: newLocations[0][1],
            lng: newLocations[0][2],
          })
        );
      }
    };
  
    getCenter();
  }, [newLocations]);

  return (
    <LoadScriptNext googleMapsApiKey={MAP_API_KEY}>
      <GoogleMap zoom={14} center={center} mapContainerStyle={containerStyle}>
        {newLocations.length > 0 &&
          newLocations.map((spot, index) => (
            <MarkerF key={index} position={{ lat: spot[1], lng: spot[2] }} />
          ))}
      </GoogleMap>
    </LoadScriptNext>
  );
};
export default Map;
