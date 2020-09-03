import { OrderState, GET_ORDERS_SUCCESS, OrderActionTypes, GET_ORDERS_FAILURE, GET_ORDERS_START, Order } from "./order.types";

const initialState: OrderState = {
  paidOrders: [],
  unpaidOrders: [],
  isLoading: false,
  error: undefined,
};

export default function userReducer(state = initialState, action: OrderActionTypes): OrderState {
  switch (action.type) {
    case GET_ORDERS_START:
      return {
        ...initialState,
        isLoading: true
      };
    case GET_ORDERS_SUCCESS:
      return {
        ...separateOrders(action.payload),
        isLoading: false,
        error: undefined,
      };
    case GET_ORDERS_FAILURE:
      return {
        ...initialState,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}

function separateOrders(list: Order[]) {
  const paidOrders = [] as Order[];
  const unpaidOrders = [] as Order[];

  list.forEach(order => {
    if (order.isPaid)
      paidOrders.push(order);
    else
      unpaidOrders.push(order);
  });

  return { paidOrders, unpaidOrders };
}