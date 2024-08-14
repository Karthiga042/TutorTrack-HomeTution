import React from 'react';
import './HelpCenter.css';
import learnerImage from '../Assets/learner.jpg'; 
import teacherImage from '../Assets/teacher.jpg'; 
import { Link } from 'react-router-dom';
import CardComponent from './CardComponent';
import Footer from '../Footer/Footer';
import Navbar from '../Navbar/Navbar';

const HelpCenter = () => {
  return (
    <div>
      <Navbar/>
    <div className="help-center">
      <div className="links">
          <Link to="home" className="link">
            Home |
          </Link>
          <Link to="/help" className="link">
            Help 
          </Link>
        </div>
      <h1 className="page-title">Help Center</h1>
      <p className="description">
        Choose a relevant category to find answers to some of the commonly asked questions
      </p>
      <div className="cards-container">
        <CardComponent 
          image={learnerImage} 
          title="Learner" 
          link="/learner"
        />
        <CardComponent 
          image={teacherImage} 
          title="Teacher" 
          link="/teacher"
        />
      </div>
      </div>
      <Footer/>
    </div>
  );
};

export default HelpCenter;
