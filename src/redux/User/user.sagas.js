import { takeLatest, call, all, put } from "redux-saga/effects";
import {
  auth,
  handleUserProfile,
  TwitterProvider,
  GoogleProvider,
} from "../../firebase/config";
import userTypes from "./user.types";
import {
  signOutUserSuccess,
  signInSuccess,
  resetPasswordSuccess,
  userError,
  updatePasswordSuccess,
} from "./user.actions";
import { handleResetPasswordAPI } from "./user.helpers";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";

import React,{useState, useContext, useEffect} from "react";

//react-toastify dependencies
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function* getSnapshotFromUserAuth(user, additionalData = {}) {
  try {
    const userRef = yield call(handleUserProfile, {
      userAuth: user,
      additionalData,
    });
    const snapshot = yield userRef.get();
    yield put(
      signInSuccess({
        id: snapshot.id,
        ...snapshot.data(),
      })
    );
  } catch (err) {
    yield put(userError(err));
  }
}

export const AuthContext = React.createContext()

export function useAuth(){
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      setCurrentUser(user)
      setLoading(false)      
    })
    return unsubscribe
  }, [])
  
  const value = {currentUser}

  return (
      <AuthContext.Provider value={value}>
        { !loading && children }
      </AuthContext.Provider>
  )
}



export function* emailSignIn({ payload: { email, password } }) {
  try {
    const { user } = yield auth.signInWithEmailAndPassword(email, password);
    toast.success("Login successfully", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    
    yield getSnapshotFromUserAuth(user);
  } catch (err) {
    yield put(userError(err));
    toast.error("invalid email/password", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
}
export function* onEmailSignInStart() {
  yield takeLatest(userTypes.EMAIL_SIGN_IN_START, emailSignIn);
}

export function* signOutUser() {
  try {
    yield auth.signOut();
    yield put(signOutUserSuccess());
  } catch (err) {
    yield put(userError(err));
  }
}
export function* onSignOutUserStart() {
  yield takeLatest(userTypes.SIGN_OUT_USER_START, signOutUser);
}

export function* signUpUser({ payload: { displayName, photoURL, email, password } }) {
  try {
    const { user } = yield auth.createUserWithEmailAndPassword(email, password)      
    const additionalData = { displayName, photoURL };
    yield getSnapshotFromUserAuth(user, additionalData);

  } catch (err) {
    yield put(userError(err));
  }
}
export function* onSignUpUserStart() {
  yield takeLatest(userTypes.SIGN_UP_USER_START, signUpUser);
}

export function* twitterSignIn() {
  try {
    const { user } = yield auth.signInWithPopup(TwitterProvider);
    yield getSnapshotFromUserAuth(user);
  } catch (err) {
    yield put(userError(err));
  }
}
export function* onTwitterSignInStart() {
  yield takeLatest(userTypes.TWITTER_SIGN_IN_START, twitterSignIn);
}

export function* googleSignIn() {
  try {
    const { user } = yield auth.signInWithPopup(GoogleProvider);
    yield getSnapshotFromUserAuth(user);
  } catch (err) {
    yield put(userError(err));
  }
}
export function* onGoogleSignInStart() {
  yield takeLatest(userTypes.GOOGLE_SIGN_IN_START, googleSignIn);
}

export function* updatePassword({ payload: { password } }) {
  try {
    yield auth.currentUser.updatePassword(password);
    toast.success("password updated successfully", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    yield put(updatePasswordSuccess());
  } catch (err) {
    yield put(userError(err));
    toast.error("invalid password", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
}
export function* onUpdatePasswordStart() {
  yield takeLatest(userTypes.UPDATE_PASSWORD_START, updatePassword);
}

export function* resetPassword({ payload: { email } }) {
  try {
    yield call(handleResetPasswordAPI, email);
    yield put(resetPasswordSuccess());
  } catch (err) {
    yield put(userError(err));
  }
}
export function* onResetPasswordStart() {
  yield takeLatest(userTypes.RESET_PASSWORD_START, resetPassword);
}

export default function* userSagas() {
  yield all([
    call(onEmailSignInStart),
    call(onSignOutUserStart),
    call(onSignUpUserStart),
    call(onTwitterSignInStart),
    call(onGoogleSignInStart),
    call(onResetPasswordStart),
    call(onUpdatePasswordStart),
  ]);
}
