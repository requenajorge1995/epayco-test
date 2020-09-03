import React, { useState } from 'react';

import './reload-balance.styles.scss';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { connect, ConnectedProps } from 'react-redux';
import { reloadBalanceStart } from '../../redux/user/user.actions';

function ReloadBalance({ reloadBalanceStart }: Props) {
  const [amount, setAmount] = useState(0);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;
    setAmount(parseFloat(value));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    reloadBalanceStart(amount);
  }

  return (
    <div className="reload-balance-wrapper">
      <h1 className="reload-balance-title">Reload your balance</h1>
      <div className="reload-balance-container">
        <form onSubmit={handleSubmit}>
          <FormInput
            name="amount"
            handleChange={handleChange}
            value={amount.toString()}
            label="Amount"
            required
          />
          <CustomButton value="Reload" />
        </form>
      </div>
    </div>
  );
}

const mapDispatchToProps = {
  reloadBalanceStart,
};

const connector = connect(undefined, mapDispatchToProps);
type Props = ConnectedProps<typeof connector>;

export default connector(ReloadBalance);
