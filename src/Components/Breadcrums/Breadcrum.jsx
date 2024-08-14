import React, { useContext } from 'react';
import { ShopContext } from '../../Context/ShopContext';

const Breadcrum = () => {
  const { category } = useContext(ShopContext) || {}; 

  if (!category) {
    return <div>Error: Category is not available.</div>;
  }

  return (
    <div className="breadcrumb">
      <h2>{category}</h2>
    </div>
  );
};

export default Breadcrum;