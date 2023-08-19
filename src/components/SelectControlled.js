import React from "react";
import { Controller } from "react-hook-form";

import { Input } from "reactstrap";

const SelectControlled = ({
  control,
  options = [],
  title,
  defaultValue = "",
  children,
  onChange,
  ...rest
}) => {
  return (
    <Controller
      control={control}
      {...rest}
      render={({ field }) => {
        const hanldeOnChange = (e) => {
          field.onChange(e);
          onChange && onChange(e);
        };

        return (
          <Input {...field} type="select" onChange={hanldeOnChange}>
            <option value={defaultValue}>{title}</option>
            {children}
          </Input>
        );
      }}
    />
  );
};

export default SelectControlled;
