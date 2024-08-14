import React from 'react';
import './CourseCard.css';
import { Link } from 'react-router-dom';

const CourseCard = ({ course }) => {
  return (
    <div className="course-card">
      <div className="course-image-container">
        <Link to={`/shopcategory/${course.category}`}>
          <img
            src={course.imageUrl}
            alt={`${course.name} course`}
            className="course-image"
          />
        </Link>
      </div>
      <div className="course-details">
        <h2 className="course-name">{course.name}</h2>
        <p className="course-description">{course.description}</p>
      </div>
    </div>
  );
};

export default CourseCard;
