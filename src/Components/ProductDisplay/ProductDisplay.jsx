import React from "react";
import './ProductDisplay.css';
import star_icon from '../Assets/star_icon.png';
import star_dull_icon from '../Assets/star_dull_icon.png';
import { Link } from "react-router-dom";

const ProductDisplay = (props) => {
    const { product } = props;

    if (!product) {
        return <div>Error: Product data is not available.</div>;
    }

    const {
        image = 'default-image.png',
        name = 'Unknown Product',
        old_price = 'N/A',
        new_price = 'N/A',
        category = 'Uncategorized',
    } = product;

    const handleChooseTutorClick = () => {
        localStorage.setItem('selectedCategory', category);
        localStorage.setItem('newPrice', new_price);
        localStorage.setItem('courseName', name);
    };

    return (
        <div className="productdisplay">
            <div className="productdisplay-left">
                <div className="product-display-img">
                    <img className="productdisplay-main-img" src={image} alt={name} />
                </div>
            </div>
            <div className="productdisplay-right">
                <h1>{name}</h1>
                <div className="productdisplay-right-star">
                    <img src={star_icon} alt="Star" />
                    <img src={star_icon} alt="Star" />
                    <img src={star_icon} alt="Star" />
                    <img src={star_icon} alt="Star" />
                    <img src={star_dull_icon} alt="Star" />
                    <p>(122)</p>
                </div>
                <div className="productdisplay-right-prices">
                    <div className="productdisplay-right-price-old">
                        ${old_price}
                    </div>
                    <div className="productdisplay-right-price-new">
                        ${new_price}
                    </div>
                </div>
                <div className="product-display-right-description">
                    <h2>Course Details:</h2>
                    <h4>Course Name: </h4> <p>{name}</p>
                    <h4>Category: </h4><p>{category}</p>
                    <h4>Description:</h4>
                    <p>
                    Dive into {name} and master the skills that will set you apart in the ever-evolving world of {category}. Whether you’re a beginner or looking to enhance your expertise, this course offers 20 hours of immersive content designed by industry experts.
                    </p>
                </div>
                <Link to="/selecttutor">
                    <button onClick={handleChooseTutorClick}>Choose Tutor</button>
                </Link>
                <br/><br/><br/>
            </div>
        </div>
    );
}

export default ProductDisplay;
