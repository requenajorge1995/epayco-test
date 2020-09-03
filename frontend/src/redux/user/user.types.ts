export interface UserState {
  currentUser: User | undefined;
  isLoading: boolean;
  error: Error | undefined;
}

export interface User {
  name: string;
  document: string;
  email: string;
  phone: string;
  balance: number;
}

export interface UserCredential {
  document: string;
  phone: string;
}

export interface UserSignUpInfo {
  name: string;
  document: string;
  email: string;
  phone: string;
}

export const SIGN_IN_START = 'SIGN_IN_START';
export const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS';
export const SIGN_IN_FAILURE = 'SIGN_IN_FAILURE';
export const SIGN_OUT = 'SIGN_OUT';

export const SIGN_UP_START = 'SIGN_UP_START';

export const GET_BALANCE_START = 'GET_BALANCE_START';
export const GET_BALANCE_SUCCESS = 'GET_BALANCE_SUCCESS';

export const RELOAD_BALANCE_START = 'RELOAD_BALANCE_START';

export interface SignInStartAction {
  type: typeof SIGN_IN_START;
  payload: UserCredential;
}

export interface SignInSuccessAction {
  type: typeof SIGN_IN_SUCCESS;
  payload: User;
}

export interface SignInFailureAction {
  type: typeof SIGN_IN_FAILURE;
  payload: Error;
}

export interface SignOutAction {
  type: typeof SIGN_OUT;
}

export interface SignUpStartAction {
  type: typeof SIGN_UP_START;
  payload: UserSignUpInfo;
}

export interface GetBalanceStartAction {
  type: typeof GET_BALANCE_START;
}

export interface GetBalanceSuccessAction {
  type: typeof GET_BALANCE_SUCCESS;
  payload: number;
}

export interface ReloadBalanceStartAction {
  type: typeof RELOAD_BALANCE_START;
  payload: number;
}

export type UserActionTypes =
  SignInStartAction |
  SignInSuccessAction |
  SignInFailureAction |
  SignOutAction |
  SignUpStartAction |
  GetBalanceStartAction |
  GetBalanceSuccessAction |
  ReloadBalanceStartAction; 