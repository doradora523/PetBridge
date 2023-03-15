import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import shelterSlice from "../../redux/slice/shelter";
import Selector from "../public/Selector";

const ShelterFilter = () => {
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
    <Selector 
    placeholder="지역을 선택해주세요"
    options={options}
    value={selectedOption}
    onChange={handleSelectChange}
    />
    
  );
};

export default ShelterFilter;
