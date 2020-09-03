import { createSelector } from 'reselect';
import { RootState } from '../root-reducer';
import { UserState } from './user.types';

function selectUser(state: RootState): UserState {
  return state.user;
};

export const selectCurrentUser = createSelector(
  [selectUser],
  user => user.currentUser
);

export const selectUserCredential = createSelector(
  [selectCurrentUser],
  currentUser => {
    if (!currentUser)
      throw new Error('<User.currentUser> is undefined');
    const { document, phone } = currentUser;
    return { document, phone };
  }
);