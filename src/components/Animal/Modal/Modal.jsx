import { Drawer } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import animalSlice from "../../../redux/slice/animal";
import AnimalInfo from "./AnimalInfo";
import ShelterInfo from "./ShelterInfo";

const Modal = () => {
  const dispatch = useDispatch();
  const openModal = useSelector((state) => state.animal.openModal);
  
  const onClose = () => {
    dispatch(animalSlice.actions.setOpenModal(false));
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
    </Drawer>
  );
};

export default Modal;
