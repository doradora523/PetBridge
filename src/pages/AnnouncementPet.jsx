import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AnimalList from "../components/Animal/AnimalList";
import Modal from "../components/Animal/Modal/Modal";
import Loader from "../components/Loader/Loader";
import { fetchAnimalsData } from "../redux/api/animalAPI";

const AnnouncementPet = () => {
  const dispatch = useDispatch();
  const {
    currentPage,
    selectedRegion,
    selectedType,
    selectedNeuter,
    isLoading,
  } = useSelector((state) => state.animal);

  // Get Animal Data
  useEffect(() => {
    dispatch(
      fetchAnimalsData({
        pageNo: currentPage,
        upkind: selectedType ? selectedType.code : null,
        upr_cd: selectedRegion ? selectedRegion.code : null,
        neuter_yn: selectedNeuter ? selectedNeuter.code : null,
      })
    );
  }, [dispatch, currentPage, selectedRegion, selectedType, selectedNeuter]);

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
