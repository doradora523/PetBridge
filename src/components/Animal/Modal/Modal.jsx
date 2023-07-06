import { Drawer } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { animalActions } from "../../../redux/slice/animal";
import Map from "./Map";
import AnimalInfo from "./AnimalInfo";
import ShelterInfo from "./ShelterInfo";

const Modal = () => {
  const dispatch = useDispatch();
  const openModal = useSelector((state) => state.animal.openModal);

  const onClose = () => {
    dispatch(animalActions.setOpenModal(false));
  };

  return (
    <Drawer
      width={640}
      placement="right"
      closable={false}
      onClose={onClose}
      open={openModal}
      className="modal-box"
    >
      <AnimalInfo />
      <ShelterInfo />
      <Map />
    </Drawer>
  );
};

export default Modal;
