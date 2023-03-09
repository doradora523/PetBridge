import React from "react";
import List from "../components/Animal/List";
import Modal from "../components/Animal/Modal/Modal";

const AnnouncementPet = () => {
  return (
    <div className="announcement">
      <div className="center">
        <List />
        <Modal />
      </div>
    </div>
  );
};

export default AnnouncementPet;
