export interface OrderState {
  paidOrders: Order[];
  unpaidOrders: Order[];
  isLoading: boolean;
  error: Error | undefined;
}

export interface Order {
  id: string;
  total: number;
  isPaid: boolean;
}

export const GET_ORDERS_START = 'GET_ORDERS_START';
export const GET_ORDERS_SUCCESS = 'GET_ORDERS_SUCCESS';
export const GET_ORDERS_FAILURE = 'GET_ORDERS_FAILURE';
export const CREATE_ORDER_START = 'CREATE_ORDER_START';
export const PAY_ORDER_START = 'PAY_ORDER_START';

export interface GetOrdersStartAction {
  type: typeof GET_ORDERS_START;
}

export interface GetOrdersSuccessAction {
  type: typeof GET_ORDERS_SUCCESS;
  payload: Order[];
}

export interface GetOrdesFailureAction {
  type: typeof GET_ORDERS_FAILURE;
  payload: Error;
}

export interface CreateOrderStartAction {
  type: typeof CREATE_ORDER_START;
  payload: number;
}

export interface PayOrderStartAction {
  type: typeof PAY_ORDER_START;
  payload: string;
}

export type OrderActionTypes =
  GetOrdersStartAction |
  GetOrdersSuccessAction |
  GetOrdesFailureAction |
  CreateOrderStartAction |
  PayOrderStartAction;