import React, { useEffect, useState } from "react";
import { GoogleMap, InfoWindow, InfoWindowF, LoadScriptNext, MarkerF } from "@react-google-maps/api";
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
  const { filteredItems, center, newLocations } = useSelector(
    (state) => state.shelter
  );
  const [clickedMarker, setClickedMarker] = useState(null);

  const handleClickMarker = (spot) => {
    setClickedMarker(spot)
  }

  useEffect(() => {
    const getLocationsData = async () => {
      const undefinedLatLng = filteredItems
        .filter((item) => !item.lat || !item.lng) // 위도와 경도가 없는 데이터만 필터링
        .map((item) => [item.careNm, item.careAddr]);

      try {
        // Promise.all을 사용하여 동시에 여러 주소를 좌표로 변환
        const geoLocations = await Promise.all(
          undefinedLatLng.map(async (item) => {
            try {
              Geocode.setApiKey(MAP_API_KEY);
              Geocode.setLanguage("en");
              Geocode.setRegion("es");
              Geocode.setLocationType("ROOFTOP");

              const response = await Geocode.fromAddress(item[1]);
              const { lat, lng } = response.results[0].geometry.location;
              
              // geoLocations에 새로운 배열 담아주기
              return [
                item[0],
                parseFloat(lat),
                parseFloat(lng),
                response.results[0].formatted_address,
              ];
            } catch (error) {
              console.log(error);
              return null;
            }
          })
        );

        // filter된 locations와 geoLocations의 배열을 새로운 변수에 담아주기
        const newLocationsData = filteredItems
          .filter((item) => item.lat && item.lng) // 위도와 경도가 있는 데이터만 필터링
          .map((item) => [
            item.careNm,
            parseFloat(item.lat),
            parseFloat(item.lng),
            item.careAddr,
          ])
          .concat(geoLocations.filter((item) => item !== null));

        dispatch(shelterSlice.actions.setNewLocations(newLocationsData));

        // 첫 번째 데이터의 좌표를 중심으로 Center 설정
        dispatch(
          shelterSlice.actions.setCenter({
            lat: newLocationsData[0][1],
            lng: newLocationsData[0][2],
          })
        );
      } catch (error) {
        console.log(error);
      }
    };

    getLocationsData();
  }, [dispatch, filteredItems]);

  return (
    <LoadScriptNext googleMapsApiKey={MAP_API_KEY}>
      <GoogleMap zoom={14} center={center} mapContainerStyle={containerStyle}>
        {newLocations.length > 0 &&
          newLocations.map((spot, index) => (
            <MarkerF
            key={index}
            position={{ lat: spot[1], lng: spot[2] }}
            onClick={() => handleClickMarker(spot)}
          >
            {clickedMarker === spot ? (
              <InfoWindowF
                onCloseClick={() => setClickedMarker(null)}
                position={{ lat: spot[1], lng: spot[2] }}
              >
                <div>
                  <p>{spot[0]}</p>
                  <p>{spot[3]}</p>
                </div>
              </InfoWindowF>
            ) : null}
          </MarkerF>
          ))}
        
      </GoogleMap>
    </LoadScriptNext>
  );
};
export default Map;
