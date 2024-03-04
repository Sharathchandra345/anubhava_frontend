import React, { useContext, createContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  signOut,
  sendPasswordResetEmail,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { auth, storage, db } from "../firebase";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});

  // Handle Google Sign In
  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    // signInWithRedirect(auth, provider); FOR MOBILE
    await signInWithPopup(auth, provider);
    return "signed_in";
  };

  // Handle Log Out
  const logOut = () => {
    signOut(auth);
  }

  // Handle Sign Up
  const signUp = async (email, password, name) => {
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      if (user) {
        await updateProfile(user, {
          displayName: name,
        });
        await sendEmailVerification(auth.currentUser);
        console.log("Email verification sent");
      }
      logOut();
      return "signed up";
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  // Handle Sign In
  const signIn = async (email, password) => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      setUser(user);
      if (!user.emailVerified) {
        logOut();
        return "verify_email";
      }
      return "signed_in"
    } catch (error) {
      return error;
    }
  };

  // Handle Forgot Password
  const forgotPassword = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      console.log("Password reset email sent");
      return "success";
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  useEffect(() => {
    const unscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => { unscribe() };
  }, []);
  return (
    <AuthContext.Provider value={{ googleSignIn, logOut, user, signUp, signIn, forgotPassword }}>
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};

export const getStorage = storage;
export const getDb = db;
