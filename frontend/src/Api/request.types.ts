export interface UserCredential {
  document: string;
  phone: string;
}

export interface ReloadBalanceRequest {
  document: string;
  phone: string;
  amount: number;
}

export interface NewUserRequest {
  document: string;
  name: string;
  email: string;
  phone: string;
}

export interface NewOrderRequest {
  document: string;
  phone: string;
  total: number;
}

export interface PaymentConfirmationRequest {
  sessionId: string;
  token: string;
}
