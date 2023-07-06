import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { shelterActions } from "../../redux/slice/shelter";
import UseFilterForm from "../public/UseFilterForm";

const ShelterFilter = () => {
  const dispatch = useDispatch();
  const { options, items, selectedOption } = useSelector(
    (state) => state.shelter
  );

  const handleSelectChange = useCallback(
    (value) => {
      dispatch(shelterActions.setSelectedOption(value));
      if (value) {
        const filteredItems = items.filter(
          (item) => item.orgNm.split(" ")[0] === value
        );
        dispatch(shelterActions.setFilteredItems(filteredItems));
      }
    },
    [dispatch, items]
  );

  return (
    <UseFilterForm
      placeholder="지역을 선택해주세요"
      options={options}
      value={selectedOption}
      onChange={handleSelectChange}
    />
  );
};

export default ShelterFilter;
