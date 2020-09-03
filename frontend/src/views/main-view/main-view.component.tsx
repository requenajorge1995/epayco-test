import React from 'react';
import './main-view.styles.scss';

import UserView from '../user-view/user-view.component';
import OrderView from '../order-view/order-view.component';

function MainView() {
  return (
    <div className="main-view">
      <UserView />
      <OrderView />;
    </div>
  );
}

export default MainView;
