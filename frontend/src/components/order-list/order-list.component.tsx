import React, { useState } from 'react';
import './order-list.styles.scss';
import { Order } from '../../redux/order/order.types';
import CustomButton from '../custom-button/custom-button.component';

import OrderComponent from '../order/order.component';

import { connect, ConnectedProps } from 'react-redux';
import { payOrderStart } from '../../redux/order/order.actions';

function OrderList({ list, paidOrdersList, payOrderStart }: Props) {
  const [selectedOrderId, setSelectedOrderId] = useState('');

  const title = `${paidOrdersList ? 'Paid' : 'Unpaid'} order list`;

  function handlePayClick() {
    payOrderStart(selectedOrderId);
  }

  function handleChangeOrderSelected(order: Order) {
    if (!paidOrdersList) return () => setSelectedOrderId(order.id);
    return () => {};
  }

  return (
    <div className="order-list-wrapper">
      <h1 className="order-list-title">{title}</h1>
      <div className="order-list-container">
        {list.map((order) => {
          return (
            <OrderComponent
              key={order.id}
              order={order}
              selected={selectedOrderId === order.id}
              clickHandler={handleChangeOrderSelected(order)}
            />
          );
        })}
      </div>
      <div className="order-list-button-container">
        {!paidOrdersList && selectedOrderId && (
          <CustomButton value="Pay" onClick={handlePayClick} />
        )}
      </div>
    </div>
  );
}

const mapDispatchToProps = {
  payOrderStart,
};

const connector = connect(undefined, mapDispatchToProps);
type Props = ConnectedProps<typeof connector> & {
  paidOrdersList: boolean;
  list: Order[];
};

export default connector(OrderList);
