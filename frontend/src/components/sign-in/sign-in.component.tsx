import React, { useState } from 'react';

import './sign-in.styles.scss';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { connect, ConnectedProps } from 'react-redux';
import { signInStart } from '../../redux/user/user.actions';

function SignIn({ signInStart }: Props) {
  const [userCredential, setUserCredential] = useState({
    document: '',
    phone: '',
  });

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setUserCredential({ ...userCredential, [name]: value });
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    signInStart(userCredential);
  }

  return (
    <div className="sign-in">
      <h2>Already registered</h2>
      <form onSubmit={handleSubmit}>
        <FormInput
          name="document"
          handleChange={handleChange}
          value={userCredential.document}
          label="Document"
          required
        />
        <FormInput
          name="phone"
          value={userCredential.phone}
          handleChange={handleChange}
          label="Phone Number"
          required
        />
        <div className="button-container">
          <CustomButton value="Login" />
        </div>
      </form>
    </div>
  );
}

const mapDispatchToProps = {
  signInStart,
};

const connector = connect(undefined, mapDispatchToProps);
type Props = ConnectedProps<typeof connector>;

export default connector(SignIn);
