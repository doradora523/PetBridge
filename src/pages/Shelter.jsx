import React from "react";
import List from "../components/Map/List";
import Map from "../components/Map/Map";

const Shelter = ({ items, locations }) => {
  return (
    <div className="container">
      <div className="center">
        <List items={items} />
        <Map locations={locations} />
      </div>
    </div>
  );
};

export default Shelter;
