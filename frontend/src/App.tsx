import React from 'react';
import './App.css';

import { connect, ConnectedProps } from 'react-redux';
import { RootState } from './redux/root-reducer';
import { selectCurrentUser } from './redux/user/user.selectors';
import SignInAndSignUp from './views/sign-in-and-sign-up/sign-in-and-sign-up.component';
import MainView from './views/main-view/main-view.component';

function App({ currentUser }: Props) {
  return (
    <div className="app">
      {currentUser ? <MainView /> : <SignInAndSignUp />}
    </div>
  );
}

function mapStateToProps(state: RootState) {
  return { currentUser: selectCurrentUser(state) };
}

const connector = connect(mapStateToProps);
type Props = ConnectedProps<typeof connector>;

export default connector(App);
