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
import axios from "axios";

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
          axios.post("http://localhost:3000/jwt",{email:currentUser?.email} ,{
            withCredentials: true,
          }).then(res => {
            console.log(res.data);
          }).catch(error => {
            console.log(error);
          })
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
