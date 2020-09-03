import React from 'react';

import './custom-buttom.styles.scss';

function CustomButton({ value, onClick }: Props) {
  return (
    <button className="custom-button" type="submit" onClick={onClick}>
      {value}
    </button>
  );
}

type Props = {
  value: string;
  onClick?: () => void;
};

export default CustomButton;
