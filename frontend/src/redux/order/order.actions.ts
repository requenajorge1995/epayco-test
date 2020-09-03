import { GET_ORDERS_START, GET_ORDERS_SUCCESS, GET_ORDERS_FAILURE, CREATE_ORDER_START, PAY_ORDER_START, Order, OrderActionTypes } from './order.types';

export function getOrdersStart(): OrderActionTypes {
  return {
    type: GET_ORDERS_START,
  };
}

export function getOrdersSuccess(orders: Order[]): OrderActionTypes {
  return {
    type: GET_ORDERS_SUCCESS,
    payload: orders
  };
}

export function getOrdersFailure(error: Error): OrderActionTypes {
  return {
    type: GET_ORDERS_FAILURE,
    payload: error
  };
}

export function payOrderStart(orderId: string): OrderActionTypes {
  return {
    type: PAY_ORDER_START,
    payload: orderId
  };
}

export function createOrderStart(total: number): OrderActionTypes {
  return {
    type: CREATE_ORDER_START,
    payload: total
  };
}