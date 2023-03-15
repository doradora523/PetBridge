import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AnimalList from "../components/Animal/AnimalList";
import Modal from "../components/Animal/Modal/Modal";
import Loader from "../components/Loader/Loader";
import { fetchAnimalsData } from "../redux/api/animalAPI";

const AnnouncementPet = () => {
  const dispatch = useDispatch();
  const { currentPage, isLoading } = useSelector((state) => state.animal);

  // Get Animal Data
  useEffect(() => {
    dispatch(fetchAnimalsData({ pageNo: currentPage }));
  }, [dispatch, currentPage]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="announcement">
          <div className="center">
            <AnimalList />
            <Modal />
          </div>
        </div>
      )}
    </>
  );
};

export default AnnouncementPet;
