import React from 'react';
import { Link } from 'react-router-dom';
import './StaffConfirmation.css';
import tickImage from '../Assets/tick.jpg'; 
import leftImage from '../Assets/work_anywhere.jpg';

const ConfirmationPage = () => {
    return (
        <div className="confirmation-page-st">
            <img
                src={leftImage}
                alt="Left Side"
                className="left-image-st"
            />
            <div className="confirmation-container-st">
                <img
                    src={tickImage}
                    alt="Green Tick"
                    className="image-element-st"
                />
                <div className="confirmation-text-st">Request Submitted!</div>
                <br/><br/>
                <div className="query-text-st">
                    For any queries, please email us at: <a href="mailto:contact@tutortrack.com">contact@tutortrack.com</a>
                </div>
                <br/><br/>
                <div className="help-section-st">
                    Need further assistance?{' '}
                    <br/><br/>
                    <Link to="/help" className="help-button-st">Get Help</Link>
                </div>
                <br/>
                <Link to="/" className="home-button-st">Back to Home</Link>
            </div>
        </div>
    );
};

export default ConfirmationPage;
