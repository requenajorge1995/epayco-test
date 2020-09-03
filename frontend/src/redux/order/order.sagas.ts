import { call, put, takeLatest, all, select } from "redux-saga/effects";
import { GET_ORDERS_START, GetOrdersStartAction, PAY_ORDER_START, CREATE_ORDER_START, CreateOrderStartAction, PayOrderStartAction } from "./order.types";
import { getOrders as getOrdersFromApi, newOrder, payOrder as payOrderFromApi, confirmPayment } from '../../Api/requests';

import { selectUserCredential } from '../user/user.selectors';
import { UserCredential } from "../user/user.types";
import { OrderResponse } from "../../Api/response.types";
import { getOrdersSuccess, getOrdersFailure, getOrdersStart } from "./order.actions";

export default function* userSagas() {
  yield all([
    call(onGetOrdersStart),
    call(onCreateOrderStart),
    call(onPayOrderStart)
  ]);
}

function* onGetOrdersStart() {
  yield takeLatest(GET_ORDERS_START, getOrders);
}

function* onCreateOrderStart() {
  yield takeLatest(CREATE_ORDER_START, createOrder);
}

function* onPayOrderStart() {
  yield takeLatest(PAY_ORDER_START, payOrder);
}

function* getOrders() {
  try {
    const userCredential: UserCredential = yield select(selectUserCredential);
    const orders: OrderResponse[] = yield call(getOrdersFromApi, userCredential);
    yield put(getOrdersSuccess(orders));
  } catch (error) {
    yield put(getOrdersFailure(error));
  }
}

function* createOrder(createOrderStartAction: CreateOrderStartAction) {
  try {
    const total = createOrderStartAction.payload;
    const userCredential: UserCredential = yield select(selectUserCredential);
    yield call(newOrder, { ...userCredential, total });
    yield put(getOrdersStart());
  } catch (error) {
    alert(error.message);
  }
}

function* payOrder(payOrderStartAction: PayOrderStartAction) {
  try {
    const orderId = payOrderStartAction.payload;
    const sessionId: string = yield call(payOrderFromApi, orderId);
    const token = prompt("Insert token to confirm payments");
    if (!token)
      return;
    yield call(confirmPayment, { sessionId, token });
    yield put(getOrdersStart());
  } catch (error) {
    alert(error.message);
  }
}
