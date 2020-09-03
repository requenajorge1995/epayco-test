export interface OrderResponse {
  id: string;
  total: number;
  isPaid: boolean;
}

export interface UserResponse {
  name: string;
  document: string;
  email: string;
  phone: string;
  balance: number;
}
