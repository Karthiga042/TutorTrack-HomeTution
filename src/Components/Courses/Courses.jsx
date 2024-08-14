import React from 'react';
import './Courses.css';
import CourseCard from './CourseCard';
import english from "../Assets/product_36.jpg";
import computer from "../Assets/product_3.png";
import maths from "../Assets/product_19.png";
import economics from "../Assets/product_25.jpg";
import biology from "../Assets/product_10.jpg";
import CourseDescription from './CourseDescription';
import Footer from '../Footer/Footer';
import SearchBar from '../SearchBar/SearchBar';
import Navbar from '../Navbar/Navbar';

const courses = [
  {
    name: 'English',
    description: 'Enhance your English language skills, including grammar, vocabulary, and communication.',
    imageUrl: english,
    category: 'english',
  },
  {
    name: 'Biology',
    description: 'Explore the science of life and living organisms, covering topics from cell biology to ecology.',
    imageUrl: biology,
    category: 'biology',
  },
  {
    name: 'Computer Science',
    description: 'Dive into the world of computing, including programming, algorithms, and data structures.',
    imageUrl: computer,
    category: 'computerscience',
  },
  {
    name: 'Mathematics',
    description: 'Study various fields of mathematics, including algebra, calculus, and statistics.',
    imageUrl: maths,
    category: 'mathematics',
  },
  {
    name: 'Economics',
    description: 'Understand economic principles, including supply and demand, market structures, and economic policies.',
    imageUrl: economics,
    category: 'economics',
  },
];

const Courses = () => {
  return (
    <div>
      <Navbar/>
    <div className="courses">
      <SearchBar/>
      <h1 className="title">Available Courses</h1>
      <CourseDescription />
      <div className="course-list">
        {courses.map((course) => (
          <CourseCard key={course.name} course={course} />
        ))}
      </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Courses;
