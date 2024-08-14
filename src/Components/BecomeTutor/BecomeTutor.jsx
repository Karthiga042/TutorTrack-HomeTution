import React from 'react';
import './BecomeTutor.css'; 
import tutor from '../Assets/tutor.jpg'; 
import FeatureSection from './FeatureSection'; 
import Footer from '../Footer/Footer';
import Navbar from '../Navbar/Navbar';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

 const BecomeTutor = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('user');
    setIsLoggedIn(!!user);
  }, []);

  const handleImageClick = () => {
    if (isLoggedIn) 
    {
      navigate('/becometutor2');
    } 
    else 
    {
      alert('Please log in to access the form.');
    }
  };
  return (
    <div>
      <Navbar/>
    <div className="become-tutor-container">
      <div className='hero-right'>
      <img 
            src={tutor} 
            alt="Become a Tutor" 
            onClick={handleImageClick} 
            style={{ cursor: 'pointer' }} 
          />
      </div>
      <br/><br/>
      <div className='hero-right-c'>
        Features
      </div>
      <FeatureSection />
      </div>
      <Footer/>
    </div>
  );
};

export default BecomeTutor;
