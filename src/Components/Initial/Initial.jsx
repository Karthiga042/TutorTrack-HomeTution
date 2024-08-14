import React from 'react';
import './Initial.css';
import learnerImage from '../Assets/user.jpg'; 
import teacherImage from '../Assets/admin.jpg'; 
import CardComponent from './CardInitial';

const Initial = () => {
  return (
    <div className="help-center">
      <h1 className="page-title">Unlock Your Learning Potential with TutorTrack!</h1>
      <p className="description">
      Seamlessly connect with top educators and elevate your skills with personalized tutoring at your convenience.
      </p>
      <div className="cards-container">
        <CardComponent 
          image={learnerImage} 
          title="User" 
          link="/home"
        />
        <CardComponent 
          image={teacherImage} 
          title="Admin" 
          link="/login3"
        />
      </div>
    </div>
  );
};

export default Initial;
