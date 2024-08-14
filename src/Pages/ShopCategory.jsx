import React, { useContext, useState, useEffect } from 'react';
import './CSS/ShopCategory.css';
import { ShopContext } from '../Context/ShopContext';
import Item from '../Components/Item/Item';
import { useParams } from 'react-router-dom';
import Navbar from '../Components/Navbar/Navbar';
import Footer from '../Components/Footer/Footer';

const ShopCategory = () => {
  const { category } = useParams(); 
  const { all_product } = useContext(ShopContext);
  const [sortCategory, setSortCategory] = useState(category || '');

  useEffect(() => {
    setSortCategory(category || '');
  }, [category]);

  if (!all_product) {
    return <div>Error: ShopContext is not available.</div>;
  }

  const handleSortChange = (event) => {
    setSortCategory(event.target.value);
  };

  return (
    <div>
      <Navbar/>
    <div className='shop-category'>
      <div className='shopcategory-indexSort'>
        <p>
          <span>Showing 1-8 </span>
          out of {all_product.length} courses
        </p>
        <div className='shopcategory-sort'>
            <b>Sort by  </b>
          <select onChange={handleSortChange} value={sortCategory}>
            <option value="computerscience">Computer Science</option>
            <option value="biology">Biology</option>
            <option value="mathematics">Mathematics</option>
            <option value="economics">Economics</option>
            <option value="english">English</option>
          </select>
        </div>
      </div>
      <div className='shopcategory-products'>
        {all_product.length > 0 ? (
          all_product
            .filter((item) => item.category === sortCategory) 
            .map((item, i) => (
              <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
            ))
        ) : (
          <p>No products available</p>
        )}
      </div>
    </div>
    <Footer/>
    </div>
  );
};

export default ShopCategory;
