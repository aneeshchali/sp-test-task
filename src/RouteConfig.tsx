import React, { useEffect, useState, useContext } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./component/login/page";
import SignUp from "./component/signup/page";
import Navbar from "./component/navbar/Navbar";
import { AuthContext } from "./context/AuthProvider";
import ProductList from "./component/ProductList";
import styles from "./index.module.scss";
import ProductDetail from "./component/productDetail";
import Profile from "./component/profile";
import { FooterCustom } from "./component/footer";

const RoutesConfig = () => {
  const [authToken, setAuthToken] = useState(
    localStorage.getItem("accessToken")
  );
  const navigate = useNavigate();
  const { isLoggedIn, setLogin, setLogout } = useContext(AuthContext);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      setLogout();
      navigate("/login");
      return;
    }
    setLogin();
    setAuthToken(accessToken);
  }, []);

  return (
    <>
      {isLoggedIn && <Navbar />}
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/product/:id" element={<ProductDetail />} />
      </Routes>
      {isLoggedIn && <FooterCustom />}
    </>
  );
};

export default RoutesConfig;
