import React, { useEffect } from 'react';
import './user-orders.styles.scss';

import OrderList from '../order-list/order-list.component';

import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../../redux/root-reducer';
import { getOrdersStart } from '../../redux/order/order.actions';
import {
  selectUnpaidOrders,
  selectPaidOrders,
} from '../../redux/order/order.selectors';

function OrdersView({ paidOrders, unpaidOrders, getOrdersStart }: Props) {
  useEffect(
    function () {
      getOrdersStart();
    },
    [getOrdersStart]
  );

  return (
    <div className="user-orders-container">
      <OrderList paidOrdersList={false} list={unpaidOrders} />
      <OrderList paidOrdersList={true} list={paidOrders} />
    </div>
  );
}

function mapStateToProps(state: RootState) {
  return {
    unpaidOrders: selectUnpaidOrders(state),
    paidOrders: selectPaidOrders(state),
  };
}

const mapDispatchToProps = {
  getOrdersStart,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type Props = ConnectedProps<typeof connector>;

export default connector(OrdersView);
