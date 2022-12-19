import { useState } from "react";
import AuthContext from '../contexts/AuthContext'
import React from "react";
import { postLogin } from "../api/routes";


export const AuthProvider = ({ children }) => {

  const currentUser = JSON.parse(localStorage.getItem('user'));

  const isUser = currentUser ? { username: currentUser.username } : null

  const [user, setUser] = useState(isUser);

  const logIn = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUser({ username: userData.username });
  };

  const logOut = () => {
    localStorage.removeItem('user');
    setUser(null);
  };
  
    return (
      <AuthContext.Provider value={{ user, logIn, logOut }}>
        {children}
      </AuthContext.Provider>
    );
  };

  