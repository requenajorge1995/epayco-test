import { combineReducers } from 'redux';
import { UserState } from './user/user.types';
import { OrderState } from './order/order.types';
import userReducer from './user/user.reducer';
import orderReducer from './order/order.reducer';


export interface RootState {
  user: UserState;
  order: OrderState;
}

const rootReducer = combineReducers({
  user: userReducer,
  order: orderReducer,
});

export default rootReducer;
