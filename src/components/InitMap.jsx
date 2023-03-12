import React from "react";
import { useSelector } from "react-redux";

const InitMap = () => {
  const center = useSelector((state) => state.shelter.center);

  const geocoder = new google.maps.Geocoder();

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: MAP_API_KEY,
  });

  const [map, setMap] = useRef(null);

  const onLoad = useCallback((map) => {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map);
  }, []);

  const onUnmount = useCallback((map) => {
    setMap(null);
  }, []);

  return (
    <LoadScriptNext googleMapsApiKey={MAP_API_KEY}>
      <GoogleMap
        defaultSoom={10}
        center={center}
        mapContainerStyle={containerStyle}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {/* {centerArray &&
        centerArray.map((spot, index) => (
          <MarkerF
            key={index}
            label={spot[0]}
            position={{ lat: spot[1], lng: spot[2] }}
          />
        ))} */}
      </GoogleMap>
    </LoadScriptNext>
  );
};

export default InitMap;
