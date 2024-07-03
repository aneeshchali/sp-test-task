// AuthContext.js
import React, { createContext, useState } from "react";

const initialAuthState = {
  isLoggedIn: false,
  setLogin: () => {},
  setLogout: () => {}
};

export const AuthContext = createContext(initialAuthState);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const setLogin = () => {
    setIsLoggedIn(true);
  };
  const setLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("accessToken");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, setLogin, setLogout }}>
      {children}
    </AuthContext.Provider>
  );
};
