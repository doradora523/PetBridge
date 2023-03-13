import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Select } from "antd";
import shelterSlice from "../../redux/slice/shelter";

const ShelterSelector = () => {
  const dispatch = useDispatch();
  const { options, items, selectedOption } = useSelector(
    (state) => state.shelter
  );

  const handleSelectChange = useCallback(
    (value) => {
      dispatch(shelterSlice.actions.setSelectedOption(value));
      if (value) {
        const filteredItems = items.filter(
          (item) => item.orgNm.split(" ")[0] === value
        );
        dispatch(shelterSlice.actions.setFilteredItems(filteredItems));
      }
    },
    [dispatch, items]
  );

  return (
    <Select
      showSearch
      style={{ width: 200 }}
      placeholder="지역을 선택해주세요"
      optionFilterProp="children"
      options={options}
      value={selectedOption}
      onChange={handleSelectChange}
    />
  );
};

export default ShelterSelector;
