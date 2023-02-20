import axios from "axios";
import { useEffect, useState } from "react";
import List from "./components/List/List";
import Map from "./components/Map/Map";
import "./style.scss";

const API_KEY = process.env.REACT_APP_API_KEY;
const REQUEST_URL = `${process.env.REACT_APP_REQUEST_URL}?serviceKey=${API_KEY}`;
const REQUEST_PARAMS = {
  numOfRows: 10,
  pageNo: 1,
  _type: "json",
};

const App = () => {
  const [locations, setLocations] = useState([]);
  const [items, setItems] = useState([]);
  console.log(items);

  useEffect(() => {
    const getData = () => {
      axios
        .get(REQUEST_URL, {
          params: REQUEST_PARAMS,
        })
        .then((res) => {
          const data = res.data.response.body.items;
          setItems(data.item);
          setLocations(data.item.map((spot) => [spot.careNm, spot.lat, spot.lng]));
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getData();
  }, []);

  return (
    <div>
      <h1 className="title">동물보호센터</h1>
      <div className="container">
        <List items={items} />
        <Map locations={locations} />
      </div>
    </div>
  );
};

export default App;
