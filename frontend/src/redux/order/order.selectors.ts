import { createSelector } from 'reselect';
import { RootState } from '../root-reducer';
import { OrderState } from './order.types';

function selectOrder(state: RootState): OrderState {
  return state.order;
};

export const selectUnpaidOrders = createSelector(
  [selectOrder],
  orderState => orderState.unpaidOrders
);

export const selectPaidOrders = createSelector(
  [selectOrder],
  orderState => orderState.paidOrders
);
