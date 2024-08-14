import React from "react";
import './Item.css';
import { Link } from "react-router-dom";

const Item = (props) => {
    return (
        <div className="item" style={{ border: '3px solid teal', padding: '10px' }}>
            <Link to={`/product/${props.id}`}>
                <img onClick={() => window.scrollTo(0, 0)} src={props.image} alt={props.name} />
            </Link>
            <p>{props.name}</p>
            <div className="item-prices">
                <div className="item-price-new">
                    ${props.new_price}
                    <Link to={`/product/${props.id}`} style={{ textDecoration: 'none' }}>
                        <button>Book Now!</button>
                    </Link>
                </div>
                <div className="item-price-old">
                    ${props.old_price}
                </div>
            </div>
        </div>
    );
}

export default Item;
