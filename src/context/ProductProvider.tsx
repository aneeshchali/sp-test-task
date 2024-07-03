// AuthContext.js
import React, { createContext, useState } from "react";

const initialProductState = {
  setCartData: (data: any) => {},
  setProducts: (data: any) => {},
  setPage: (page: number) => {},
  setTotal: (page: number) => {},
  page: 0,
  total: 0,
  productData: [],
  cartData: [],
};

export const ProductContext = createContext(initialProductState);

export const ProductProvider = ({ children }) => {
  const [productData, setProductData] = useState([]);
  const [cartData, setCartData] = useState([]);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);

  const setProducts = (data) => {
    setProductData(data);
  };


  return (
    <ProductContext.Provider
      value={{
        total,
        setTotal,
        page,
        setPage,
        setCartData,
        setProducts,
        productData,
        cartData,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
