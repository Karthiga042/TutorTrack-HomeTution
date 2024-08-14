import React, { createContext, useState, useEffect } from 'react';
import all_product from '../Components/Assets/all_product'; 

export const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState(''); 

  useEffect(() => {
    setProducts(all_product); 
  }, []);

  useEffect(() => {
    setCategory('.');
  }, []);

  return (
    <ShopContext.Provider value={{ all_product: products, category }}>
      {children}
    </ShopContext.Provider>
  );
};
