import React from "react";
import './Popular.css';
import data_product from "../Assets/data";
import Item from '../Item/Item';

const Popular=()=>
{
    return(
        <div>
        <div className="popular">
            <h1>NOW TRENDING COURSES</h1>
            <hr />
                </div>
            <div className="popular-item">
                {data_product.map((item,i)=>{
                    return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
                })}
            </div>
            <div className="popular">
            <h1>COURSES ON OFFER</h1>
            <hr />
            </div>
            <br/>
        </div>
    )
}
export default Popular