import React from 'react';
import './order.styles.scss';
import { Order } from '../../redux/order/order.types';

function OrderComponent({ order, clickHandler, selected }: Props) {
  return (
    <div
      className={`order-container ${selected ? 'selected' : ''}`}
      onClick={clickHandler ? clickHandler : () => {}}
    >
      <p>ID: {order.id}</p>
      <p>Total: {order.total}</p>
    </div>
  );
}

type Props = {
  order: Order;
  selected: boolean;
  clickHandler?: () => void;
};

export default OrderComponent;
