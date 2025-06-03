import React, { useEffect, useState } from "react";
import { AuthContext } from "../Context/Context";
import {
  createUserWithEmailAndPassword,
  deleteUser,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase/firebase.config";

const FirebaseAuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const signUpUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
    };

  const signInUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
    };
    const userUpDateProfile = (UpdateInfo) => {
        return updateProfile(auth.currentUser, UpdateInfo);
    }
    
    const signOutUser = () => {
        return signOut(auth)
  }
  const userDelete = () => {
    return deleteUser(auth.currentUser);
  }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
          
          setUser(currentUser)
          console.log(currentUser);
        })
        return () => {
            unsubscribe()
        }
    },[])

    const userInfo = {
      user,
      signUpUser,
      signInUser,
      userUpDateProfile,
      signOutUser,
      userDelete,
    };

  return <AuthContext value={userInfo}>{children}</AuthContext>;
};

export default FirebaseAuthProvider;
