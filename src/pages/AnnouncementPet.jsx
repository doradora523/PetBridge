import React from 'react'
import List from '../components/Animal.jsx/List';
import Modal from '../components/Animal.jsx/Modal';

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
