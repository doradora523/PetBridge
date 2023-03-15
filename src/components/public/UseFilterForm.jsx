import { Select } from "antd";
import React from "react";

const UseFilterForm = (props) => {
  const { placeholder, options, value, onChange } = props;

  return (
    <Select
      showSearch
      style={{ width: "200px" }}
      placeholder={placeholder}
      optionFilterProp="children"
      options={options}
      value={value}
      onChange={onChange}
    />
  );
};

export default UseFilterForm;
