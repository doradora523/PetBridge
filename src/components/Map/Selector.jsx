import { Form, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import shelterSlice from "../../redux/slice/shelter";

const Selector = () => {
  let options = useSelector((state) => state.shelter.options);
  let selectedOption = useSelector((state) => state.shelter.selectedOption);

  const dispatch = useDispatch();

  const handleSelectedChange = (selectedOption) => {
    dispatch(shelterSlice.actions.setSelectedOption(selectedOption));
    console.log(selectedOption);
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
      onChange={handleSelectedChange}
    />
  );
};
export default Selector;
