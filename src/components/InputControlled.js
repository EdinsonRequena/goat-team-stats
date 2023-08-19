import React from 'react';
import { Controller } from 'react-hook-form';
import { Input } from 'reactstrap';

const InputControlled = ({ control, type = 'text', ...rest }) => {
  return (
    <Controller
      control={control}
      {...rest}
      render={({ field }) => (
        <Input
          type={type}
          {...field}
        />
      )}
    />
  );
};

export default InputControlled;
