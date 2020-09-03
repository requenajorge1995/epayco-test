import { UserState, UserActionTypes, SIGN_IN_START, SIGN_UP_START, SIGN_IN_SUCCESS, SIGN_IN_FAILURE, SIGN_OUT, GET_BALANCE_SUCCESS } from './user.types';

const initialState: UserState = {
  currentUser: undefined,
  isLoading: false,
  error: undefined,
};

export default function userReducer(state = initialState, action: UserActionTypes): UserState {
  switch (action.type) {
    case SIGN_IN_START:
    case SIGN_UP_START:
      return {
        ...initialState,
        isLoading: true
      };
    case SIGN_IN_SUCCESS:
      return {
        currentUser: action.payload,
        isLoading: false,
        error: undefined,
      };
    case SIGN_IN_FAILURE:
      return {
        currentUser: undefined,
        isLoading: false,
        error: action.payload
      };
    case SIGN_OUT:
      return { ...initialState };
    case GET_BALANCE_SUCCESS:
      if (state.currentUser)
        return {
          ...state,
          currentUser: {
            ...state.currentUser,
            balance: action.payload,
          }
        };
    //fallthrough
    default:
      return state;
  }
}
