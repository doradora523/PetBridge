import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import UseFilterForm from "../public/UseFilterForm";
import { animalActions } from "../../redux/slice/animal";
const AnimalFilter = () => {
  const dispatch = useDispatch();
  const {
    region,
    type,
    neuter,
    items,
    selectedRegion,
    selectedType,
    selectedNeuter,
  } = useSelector((state) => state.animal);

  const handleSelectChange = useCallback(
    (code, value, type) => {
      if (type === "region") {
        dispatch(animalActions.setSelectedRegion(value));
      }
      if (type === "type") {
        dispatch(animalActions.setSelectedType(value));
      }
      if (type === "neuter") {
        dispatch(animalActions.setSelectedNeuter(value));
      }
    },
    [dispatch, items]
  );
  return (
    <div className="filters">
      <UseFilterForm
        placeholder="지역"
        options={region}
        value={selectedRegion}
        onChange={(value, code) => handleSelectChange(value, code, "region")}
      />
      <UseFilterForm
        placeholder="종류"
        options={type}
        value={selectedType}
        onChange={(value, code) => handleSelectChange(value, code, "type")}
      />
      <UseFilterForm
        placeholder="중성화 여부"
        options={neuter}
        value={selectedNeuter}
        onChange={(value, code) => handleSelectChange(value, code, "neuter")}
      />
    </div>
  );
};

export default AnimalFilter;
