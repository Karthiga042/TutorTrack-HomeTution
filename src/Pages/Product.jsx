import Breadcrum from '../Components/Breadcrums/Breadcrum';
import React, { useContext } from 'react';
import { ShopContext } from '../Context/ShopContext';
import { useParams } from 'react-router-dom';
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay';
import Navbar from '../Components/Navbar/Navbar';
import Footer from '../Components/Footer/Footer';

const Product=()=>
{
    const {all_product}=useContext(ShopContext);
    const {productId} = useParams();
    const product=all_product.find((e) => e.id === Number(productId));
    return(
        <div>
            <Navbar/>
            <Breadcrum product={product}/>
            <ProductDisplay product={product}/>
            <Footer/>
        </div>
    );
}
export default Product