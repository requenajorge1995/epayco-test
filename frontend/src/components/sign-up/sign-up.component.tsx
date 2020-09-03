import React, { useState } from 'react';

import './sign-up.styles.scss';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { connect, ConnectedProps } from 'react-redux';
import { signUpStart } from '../../redux/user/user.actions';

function SignUp({ signUpStart }: Props) {
  const [newUserInfo, setNewUserInfo] = useState({
    document: '',
    name: '',
    email: '',
    phone: '',
  });

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setNewUserInfo({ ...newUserInfo, [name]: value });
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    signUpStart(newUserInfo);
  }

  return (
    <div className="sign-in">
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <FormInput
          name="document"
          handleChange={handleChange}
          value={newUserInfo.document}
          label="Document"
          required
        />
        <FormInput
          name="name"
          handleChange={handleChange}
          value={newUserInfo.name}
          label="Full Name"
          required
        />
        <FormInput
          name="email"
          handleChange={handleChange}
          value={newUserInfo.email}
          label="Email"
          required
        />
        <FormInput
          name="phone"
          value={newUserInfo.phone}
          handleChange={handleChange}
          label="Phone Number"
          required
        />
        <div className="button-container">
          <CustomButton value="Register" />
        </div>
      </form>
    </div>
  );
}

const mapDispatchToProps = {
  signUpStart,
};

const connector = connect(undefined, mapDispatchToProps);
type Props = ConnectedProps<typeof connector>;

export default connector(SignUp);
