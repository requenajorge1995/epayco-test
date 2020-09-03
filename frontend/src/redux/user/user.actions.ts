import { SIGN_IN_START, SIGN_IN_SUCCESS, SIGN_IN_FAILURE, SIGN_OUT, SIGN_UP_START, GET_BALANCE_START, GET_BALANCE_SUCCESS, RELOAD_BALANCE_START, UserCredential, UserActionTypes, User, UserSignUpInfo } from './user.types';

export function signInStart(userCredential: UserCredential): UserActionTypes {
  return {
    type: SIGN_IN_START,
    payload: userCredential
  };
}

export function signInSuccess(user: User): UserActionTypes {
  return {
    type: SIGN_IN_SUCCESS,
    payload: user
  };
}

export function signInFailure(error: Error): UserActionTypes {
  return {
    type: SIGN_IN_FAILURE,
    payload: error
  };
}

export function signOut(): UserActionTypes {
  return {
    type: SIGN_OUT
  };
}

export function signUpStart(userSignUpInfo: UserSignUpInfo): UserActionTypes {
  return {
    type: SIGN_UP_START,
    payload: userSignUpInfo
  };
}

export function getBalanceStart(): UserActionTypes {
  return {
    type: GET_BALANCE_START
  };
}

export function getBalanceSuccess(balance: number): UserActionTypes {
  return {
    type: GET_BALANCE_SUCCESS,
    payload: balance
  };
}

export function reloadBalanceStart(amount: number): UserActionTypes {
  return {
    type: RELOAD_BALANCE_START,
    payload: amount
  };
}

