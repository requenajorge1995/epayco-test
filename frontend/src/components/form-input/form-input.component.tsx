import React from 'react';

import './form-input.styles.scss';

function FormInput({ handleChange, label, value, required, name }: Props) {
  return (
    <div className="group">
      <input
        name={name}
        className="form-input"
        onChange={handleChange}
        required={required}
      />
      {label ? (
        <label className={`${value.length ? 'shrink' : ''} form-input-label`}>
          {label}
        </label>
      ) : null}
    </div>
  );
}

type Props = {
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  name: string;
  value: string;
  required: boolean;
};
export default FormInput;
