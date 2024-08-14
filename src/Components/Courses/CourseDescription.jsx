import React from "react";
import "./CourseDescription.css";
import courseImage from "../Assets/courses_page.jpg"; 

const CourseDescription = () => {
  return (
    <div className="course-container">
      <div className="image-container">
        <img src={courseImage} alt="Home Tuition" className="course-image" />
      </div>
      <div className="content-container">
        <h2>Unlock Your Potential with Personalized Home Tuition Courses!</h2>
        <p>
          Dive into a world of customized learning experiences tailored just for
          you! Our expert tutors bring the classroom to your doorstep, offering
          one-on-one guidance that adapts to your unique pace and learning
          style. Whether it's mastering complex subjects or excelling in exams,
          our home tuition courses are designed to build confidence and ignite a
          passion for learning. Embrace the future of education—where your home
          is your classroom and your success is our mission.
        </p>
      </div>
    </div>
  );
};

export default CourseDescription;
