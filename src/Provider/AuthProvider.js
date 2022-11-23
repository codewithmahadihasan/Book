import { createUserWithEmailAndPassword, getAuth, GithubAuthProvider, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { createContext } from "react";

import Swal from "sweetalert2";
import app from "../Firebase/firebase";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const auth = getAuth(app);
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    const googleProvider = new GoogleAuthProvider();
    const githubProvider = new GithubAuthProvider();

    const Google = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    };

    const Github = () => {
        setLoading(true);
        return signInWithPopup(auth, githubProvider);
    };

    const RegistrationInEmail = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const loginWithEamil = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    const logOut = () => {
        setLoading(true);
        signOut(auth)

    };
    const forgetPass = (email) => {
        if (email === true) {
            sendPasswordResetEmail(auth, email)
                .then(() => {
                    Swal.fire("We are sent a mail", "Please Check Your Mail", "success");
                })
                .catch((error) => { });
        } else {
            Swal.fire("Sorry Sir", "Please input your email", "info");
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setLoading(false);
            setUser(user);
        });
        return () => {
            setLoading(true);
            unsubscribe();
        };
    }, []);

    const authInfo = {
        user,
        Google,
        Github,
        RegistrationInEmail,
        logOut,
        forgetPass,
        loginWithEamil,
        loading,
        setLoading
    };
    return (
        <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
    );
};

export default AuthProvider;
