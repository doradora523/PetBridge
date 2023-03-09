import { createSelector } from "@reduxjs/toolkit";
import { Form, Select } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import shelterSlice from "../../redux/slice/shelter";

const Selector = () => {
  const dispatch = useDispatch();

  const options = useSelector((state) => state.shelter.options);
  const items = useSelector((state) => state.shelter.items);
  const selectedOption = useSelector((state) => state.shelter.selectedOption);
  const filteredItems = useSelector((state) => state.shelter.filteredItems);

  const handleSelectedChange = (selectedOption) => {
    dispatch(shelterSlice.actions.setSelectedOption(selectedOption));
  };

  // const items = (state) => state.shelter.selectedOption
  // const selectedOption = (state) => state.shelter.items
  // const selectFilteredItems = createSelector(
  //   items,
  //   selectedOption,
  //   (items, selectedOption) =>
  //     items.filter((item) => item.orgNm.split(" ")[0] === selectedOption)
  // );

  const selectFilteredData = items.filter(
    (item) => item.orgNm.split(" ")[0] === selectedOption
  );
  // Get Filtered Items
  useEffect(() => {
    dispatch(shelterSlice.actions.setFilteredItems(selectFilteredData));
  }, [selectedOption]);

  // Get Locations
  useEffect(() => {
    const locationData = filteredItems.map((spot) => [
      spot.careNm,
      spot.lat,
      spot.lng,
    ]);
    dispatch(shelterSlice.actions.getLocations(locationData));
  }, [filteredItems]);

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
      onChange={handleSelectedChange}
    />
  );
};
export default Selector;
