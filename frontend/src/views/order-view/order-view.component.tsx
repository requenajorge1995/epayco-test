import React from 'react';
import './order-view.styles.scss';

import NewOrder from '../../components/new-order/new-order.component';
import UserOrders from '../../components/user-orders/user-orders.component';

function OrderView() {
  return (
    <div className="order-view">
      <NewOrder />
      <UserOrders />
    </div>
  );
}

export default OrderView;
