import { Select } from 'antd'
import React from 'react'

const Selector = (props) => {
  const { placeholder, options, value, onChange } = props

  return (
    <Select
      showSearch
      style={{width: '200px'}}
      placeholder={placeholder}
      optionFilterProp="children"
      options={options}
      // defaultValue={options[0].value}
      value={value}
      onChange={onChange}
    />
  )
}

export default Selector