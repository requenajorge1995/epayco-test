import React, { useState } from 'react';

import './new-order.styles.scss';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { connect, ConnectedProps } from 'react-redux';
import { createOrderStart } from '../../redux/order/order.actions';

function NewOrder({ createOrderStart }: Props) {
  const [total, setTotal] = useState(0);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;
    setTotal(parseFloat(value));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    createOrderStart(total);
  }

  return (
    <div className="new-order-wrapper">
      <h1 className="new-order-title">Create new order</h1>
      <div className="new-order-container">
        <form onSubmit={handleSubmit}>
          <FormInput
            name="total"
            handleChange={handleChange}
            value={total.toString()}
            label="Total"
            required
          />
          <CustomButton value="Generate" />
        </form>
      </div>
    </div>
  );
}

const mapDispatchToProps = {
  createOrderStart,
};

const connector = connect(undefined, mapDispatchToProps);
type Props = ConnectedProps<typeof connector>;

export default connector(NewOrder);
