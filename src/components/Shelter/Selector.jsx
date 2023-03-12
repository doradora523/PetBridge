import { createSelector } from "@reduxjs/toolkit";
import { Select } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import shelterSlice from "../../redux/slice/shelter";

const Selector = () => {
  const dispatch = useDispatch();

  const options = useSelector((state) => state.shelter.options);
  const items = useSelector((state) => state.shelter.items);
  const selectedOption = useSelector((state) => state.shelter.selectedOption);

  const selectedItemsHandler = (selectedOption) => {
    dispatch(shelterSlice.actions.setSelectedOption(selectedOption));

    if (selectedOption) {
      const selectFilteredData = items.filter(
        (item) => item.orgNm.split(" ")[0] === selectedOption
      );
      dispatch(shelterSlice.actions.setFilteredItems(selectFilteredData));
    }
  };

  return (
    <Select
      showSearch
      style={{
        width: 200,
      }}
      placeholder="지역을 선택해주세요"
      optionFilterProp="children"
      options={options}
      value={selectedOption}
      onChange={selectedItemsHandler}
    />
  );
};
export default Selector;
