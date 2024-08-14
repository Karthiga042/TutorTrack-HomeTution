import React from 'react';
import './CardComponent.css';
import { Link } from 'react-router-dom';

const CardComponent = ({ image, title, link }) => {
  return (
    <div className="card">
      <img src={image} alt={title} className="card-image" />
      <div className="card-content">
        <h2 className="card-title">{title}</h2>
        <Link to={link} className="ask-now-button">Ask Now</Link>
      </div>
    </div>
  );
};

export default CardComponent;
