import { useState } from "react";
import AuthContext from '../contexts/AuthContext'
import React from "react";



export const AuthProvider = ({ children }) => {

  const currentUser = JSON.parse(localStorage.getItem('user'));

  const isUser = currentUser ? { username: currentUser.username } : null

  const [user, setUser] = useState(isUser);

  const getAuthHeader = () => {
    const user = JSON.parse(window.localStorage.getItem('user'));
    if (user && user.token) {
      return { Authorization: `Bearer ${user.token}` };
    }
    return {};
  };
  

  const logIn = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUser({ username: userData.username });
  };

  const logOut = () => {
    localStorage.removeItem('user');
    setUser(null);
  };
  
    return (
      <AuthContext.Provider value={{ user, logIn, logOut, getAuthHeader }}>
        {children}
      </AuthContext.Provider>
    );
  };

  /*try {
    const response = await axios.post(routes.signupApiPath(), {
      username,
      password,
    });
    auth.logIn(response.data);
    navigate(routes.mainPagePath());
  } */