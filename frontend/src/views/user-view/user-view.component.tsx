import React from 'react';
import './user-view.styles.scss';

import UserInfo from '../../components/user-info/user-info.component';
import ReloadBalance from '../../components/reload-balance/reload-balance.component';

function UserView() {
  return (
    <div className="user-view">
      <UserInfo />
      <ReloadBalance />
    </div>
  );
}

export default UserView;
