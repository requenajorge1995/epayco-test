import { UserCredential, NewUserRequest, ReloadBalanceRequest, NewOrderRequest, PaymentConfirmationRequest } from './request.types';
import { UserResponse, OrderResponse } from './response.types';

const URL = 'http://localhost:3001';

interface ApiResponse {
  message: string,
  data: any;
}

export async function getUserInfo(userCredential: UserCredential): Promise<UserResponse> {
  const apiResponse = await postRequestMaker('/user', userCredential);
  return apiResponse.data as UserResponse;
}

export async function newUser(newUserRequest: NewUserRequest): Promise<void> {
  await postRequestMaker('/user/new', newUserRequest);
}

export async function getBalance(userCredential: UserCredential): Promise<number> {
  const apiResponse = await postRequestMaker('/user/balance', userCredential);
  return apiResponse.data as number;
}

export async function reloadBalance(reloadBalanceRequest: ReloadBalanceRequest): Promise<void> {
  await postRequestMaker('/user/reload', reloadBalanceRequest);
}

export async function getOrders(userCredential: UserCredential): Promise<OrderResponse[]> {
  const apiResponse = await postRequestMaker('/orders', userCredential);
  return apiResponse.data as OrderResponse[];
}

export async function newOrder(newOrderRequest: NewOrderRequest): Promise<void> {
  await postRequestMaker('/orders/new', newOrderRequest);
}

export async function payOrder(orderId: string): Promise<string> {
  const apiResponse = await postRequestMaker('/payments/pay-order', orderId);
  return apiResponse.data as string;
}

export async function confirmPayment(paymentConfirmationRequest: PaymentConfirmationRequest): Promise<void> {
  await postRequestMaker('/payments/confirm-payment', paymentConfirmationRequest);
}

async function postRequestMaker(path: string, body: any): Promise<ApiResponse> {
  const response = await fetch(URL + path, bodyMaker(body));
  const apiResponse = await response.json() as ApiResponse;
  if (!response.ok) {
    throw new Error(apiResponse.message);
  }
  return apiResponse;
}

function bodyMaker(data: any) {
  return {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(data)
  };
}