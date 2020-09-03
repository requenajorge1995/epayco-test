import { call, put, takeLatest, all, select } from "redux-saga/effects";
import { SIGN_IN_START, SignInStartAction, SIGN_UP_START, SignUpStartAction, GET_BALANCE_START, UserCredential, RELOAD_BALANCE_START, ReloadBalanceStartAction } from "./user.types";
import { signInSuccess, signInFailure, signInStart, getBalanceSuccess, getBalanceStart } from "./user.actions";
import { getUserInfo, newUser, getBalance as getBalanceFromApi, reloadBalance as reloadBalanceFromApi } from "../../Api/requests";
import { UserResponse } from "../../Api/response.types";
import { selectUserCredential } from './user.selectors';

export default function* userSagas() {
  yield all([
    call(onSignInStart),
    call(onSignUpStart),
    call(onGetBalanceStart),
    call(onReloadBalanceStart),
  ]);
}

function* onSignInStart() {
  yield takeLatest(SIGN_IN_START, signIn);
}

function* onSignUpStart() {
  yield takeLatest(SIGN_UP_START, signUp);
}

function* onGetBalanceStart() {
  yield takeLatest(GET_BALANCE_START, getBalance);
}

function* onReloadBalanceStart() {
  yield takeLatest(RELOAD_BALANCE_START, reloadBalance);
}

function* signIn(signInStartAction: SignInStartAction) {
  try {
    const userCredential = signInStartAction.payload;
    const userResponse: UserResponse = yield call(getUserInfo, userCredential);
    yield put(signInSuccess(userResponse));
  } catch (error) {
    yield put(signInFailure(error));
  }
}

function* signUp(signUpStartAction: SignUpStartAction) {
  try {
    const userSignUpInfo = signUpStartAction.payload;
    yield call(newUser, userSignUpInfo);
    const { document, phone } = userSignUpInfo;
    yield put(signInStart({ document, phone }));
  } catch (error) {
    alert(error.message);
  }
}

function* getBalance() {
  try {
    const userCredential: UserCredential = yield select(selectUserCredential);
    console.log({ userCredential });
    const balance: number = yield call(getBalanceFromApi, userCredential);
    yield put(getBalanceSuccess(balance));
  } catch (error) {
    alert(error.message);
  }
}

function* reloadBalance(reloadBalanceStartAction: ReloadBalanceStartAction) {
  try {
    const userCredential: UserCredential = yield select(selectUserCredential);
    const amount = reloadBalanceStartAction.payload;
    yield call(reloadBalanceFromApi, { ...userCredential, amount });
    yield put(getBalanceStart());
  } catch (error) {
    alert(error.message);
  }
}







// export function* onSignUpStart() {
//   yield takeLatest(SIGN_UP_START, SignUp);
// }


// export function* onSignInWithGoogle() {
//   yield takeLatest(GOOGLE_SIGN_IN_START, signInWithGoogle);
// }

// export function* onCheckUserSesion() {
//   yield takeLatest(CHECK_USER_SESSION, isUserAuthenticated);
// }

// export function* onSignOut() {
//   yield takeLatest(SIGN_OUT_START, signOut);
// }

// export function* SignUp(signUpStartAction: SignUpStartAction) {
//   const { email, password, ...additionalData } = signUpStartAction.payload;
//   try {
//     const user = yield call(createUserWithEmailAndPassword, email, password);
//     yield getSnapshotFromUserAuth(user, additionalData);
//   } catch (error) {
//     yield put(signUpFailure(error));
//   }
// }

// export function* signInWithEmail(emailSignInStartAction: EmailSignInStartAction) {
//   const { email, password } = emailSignInStartAction.payload;
//   try {
//     const user = yield call(signInWithEmailAndPassword, email, password);
//     yield getSnapshotFromUserAuth(user);
//   } catch (error) {
//     yield put(signUpFailure(error));
//   }
// }

// export function* signInWithGoogle() {
//   try {
//     const user = yield call(signInWithGooglePopup);
//     yield getSnapshotFromUserAuth(user);
//   } catch (error) {
//     yield put(signInFailure(error));
//   }
// }

// export function* isUserAuthenticated() {
//   try {
//     const user = yield call(getCurrentUser);
//     if (!user) return;
//     yield call(getSnapshotFromUserAuth, user);
//   } catch (error) {
//     yield put(signInFailure(error));
//   }
// }

// export function* signOut() {
//   try {
//     yield call(firebaseLogOut);
//     yield put(signOutSuccess());
//   } catch (error) {
//     yield put(signOutFailure(error));
//   }
// }