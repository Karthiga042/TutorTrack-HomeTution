import React from 'react';
import './CardInitial.css';
import { Link } from 'react-router-dom';

const CardInitial = ({ image, title, link }) => {
  return (
    <div className="card">
      <img src={image} alt={title} className="card-image" />
      <div className="card-content">
        <h2 className="card-title">{title}</h2>
        <Link to={link} className="ask-now-button">Direct Me!</Link>
      </div>
    </div>
  );
};

export default CardInitial;
