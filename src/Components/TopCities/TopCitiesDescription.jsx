import React from "react";
import "./TopCitiesDescription.css";
import cityImage from "../Assets/topcities.jpg"; 

const TopCitiesDescription = () => {
  return (
    <div className="top-cities-container">
      <div className="top-cities-image-container">
        <img src={cityImage} alt="Top Cities Home Tuition" className="top-cities-image" />
      </div>
      <div className="top-cities-content-container">
        <h2>Discover Top-Notch Home Tuition in the Heart of India’s Most Vibrant Cities!</h2>
        <p>
          Unlock the best of personalized education with our expert home tutors, now available in Mumbai, Delhi, Bangalore, Chennai, Hyderabad, and Pondicherry. Our tailored tutoring services bring high-quality, one-on-one instruction right to your doorstep, adapting to your learning style and schedule. From mastering intricate subjects to excelling in exams, our local tutors are dedicated to helping you achieve your academic goals. Experience the convenience of top-tier education where you live and watch your potential soar!
        </p>
      </div>
    </div>
  );
};

export default TopCitiesDescription;
