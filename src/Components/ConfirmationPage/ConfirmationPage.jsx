import React from 'react';
import { Link } from 'react-router-dom';
import './ConfirmationPage.css';
import tickImage from '../Assets/tick.jpg'; 
import leftImage from '../Assets/work_anywhere.jpg';

const ConfirmationPage = () => {
    return (
        <div className="confirmation-page">
            <img
                src={leftImage}
                alt="Left Side"
                className="left-image"
            />
            <div className="confirmation-container">
                <img
                    src={tickImage}
                    alt="Green Tick"
                    className="image-element"
                />
                <div className="confirmation-text">Course Booking Confirmed!</div>
                <br/><br/>
                <div className="query-text">
                    For any queries, please email us at: <a href="mailto:contact@tutortrack.com">contact@tutortrack.com</a>
                </div>
                <br/><br/>
                <div className="help-section">
                    Need further assistance?{' '}
                    <br/><br/>
                    <Link to="/help" className="help-button">Get Help</Link>
                </div>
                <br/>
                <Link to="/" className="home-button">Back to Home</Link>
            </div>
        </div>
    );
};

export default ConfirmationPage;
