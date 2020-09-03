import React from 'react';
import './user-info.styles.scss';

import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../../redux/root-reducer';
import { selectCurrentUser } from '../../redux/user/user.selectors';

function UserInfo({ currentUser }: Props) {
  return (
    <div className="user-info-wrapper">
      <h1 className="user-info-title">User information</h1>
      <div className="user-info-container">
        <div className="user-item">
          <p className="prop-name">Name</p>
          <p className="prop-value">{currentUser?.name}</p>
        </div>
        <div className="user-item">
          <p className="prop-name">Document</p>
          <p className="prop-value">{currentUser?.document}</p>
        </div>
        <div className="user-item">
          <p className="prop-name">Phone</p>
          <p className="prop-value">{currentUser?.phone}</p>
        </div>
        <div className="user-item">
          <p className="prop-name">Email</p>
          <p className="prop-value">{currentUser?.email}</p>
        </div>
        <div className="user-item balance">
          <p className="prop-name">Balance</p>
          <p className="prop-value">{currentUser?.balance}</p>
        </div>
      </div>
    </div>
  );
}

function mapStateToProps(state: RootState) {
  return { currentUser: selectCurrentUser(state) };
}

const connector = connect(mapStateToProps);
type Props = ConnectedProps<typeof connector>;

export default connector(UserInfo);
