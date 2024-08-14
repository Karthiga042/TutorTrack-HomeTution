import React, { useState, useEffect } from 'react';
import all_product from '../Assets/all_product'; 
import './CoursesPage.css'; 
import CourseCount from './CourseCount'; 
import CourseChart from './CourseChart'; 
import axios from 'axios';
const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [sortCategory, setSortCategory] = useState('');
  const [dataSent, setDataSent] = useState(false); 

  const storeCoursesLocally = (coursesData) => {
    localStorage.setItem('courses', JSON.stringify(coursesData));
  };

  const fetchCourses = () => {
    const localCourses = localStorage.getItem('courses');
    if (localCourses) {
      try {
        const parsedCourses = JSON.parse(localCourses);
        setCourses(parsedCourses);
        setFilteredCourses(parsedCourses);
        console.log('Fetched Product Data from Local Storage:', parsedCourses);
      } catch (error) {
        console.error('Failed to parse courses from local storage:', error);
        setCourses(all_product);
        setFilteredCourses(all_product);
        storeCoursesLocally(all_product);
        console.log('Stored Product Data:', all_product);
      }
    } else {
      setCourses(all_product);
      setFilteredCourses(all_product);
      storeCoursesLocally(all_product);
      console.log('No local storage data, using fallback:', all_product);
    }
  };

  const sendCoursesToBackend = async (coursesData) => {
    try {
      for (const course of coursesData) {
        const response = await fetch(course.image);
        const blob = await response.blob();

        const formData = new FormData();
        formData.append('name', course.name);
        formData.append('category', course.category);
        formData.append('newPrice', course.new_price);
        formData.append('oldPrice', course.old_price);
        formData.append('image', blob, 'image.jpg'); 

        console.log('Sending course to backend:', course.name);

        try {
          const response = await axios.post('http://localhost:8080/course/add', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });

          console.log('Response from backend:', response.data);
        } catch (error) {
          console.error('Failed to send course data to backend:', error.response?.data || error.message);
        }
      }
      console.log('Courses data sent to backend successfully.');
      localStorage.removeItem('courses');
      setDataSent(true); 
    } catch (error) {
      console.error('Failed to process courses data:', error.message);
    }
  };

  useEffect(() => {
    fetchCourses();

    if (!dataSent) {
      const localCourses = localStorage.getItem('courses');
      if (localCourses) {
        const parsedCourses = JSON.parse(localCourses);
        sendCoursesToBackend(parsedCourses);
      }
    }
  }, [dataSent]); 

  const handleSort = (e) => {
    const category = e.target.value;
    setSortCategory(category);

    if (category) {
      const filtered = courses.filter(course => course.category.toLowerCase() === category.toLowerCase());
      setFilteredCourses(filtered);
    } else {
      setFilteredCourses(courses);
    }
  };

  const categoryCounts = filteredCourses.reduce((acc, course) => {
    const category = course.category;
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="courses-page">
      <CourseCount
        mathematicsCount={categoryCounts['mathematics'] || 0}
        englishCount={categoryCounts['english'] || 0}
        biologyCount={categoryCounts['biology'] || 0}
        economicsCount={categoryCounts['economics'] || 0}
        computerScienceCount={categoryCounts['computerscience'] || 0}
      />
      <div className="sort-controls">
        <select
          value={sortCategory}
          onChange={handleSort}
          className="sort-dropdown"
        >
          <option value="">Filter by Category Name</option>
          <option value="English">English</option>
          <option value="Mathematics">Mathematics</option>
          <option value="Computerscience">Computer Science</option>
          <option value="Economics">Economics</option>
          <option value="Biology">Biology</option>
        </select>
      </div>
      <table>
        <thead>
          <tr>
            <th>Course ID</th>
            <th>Course Image</th>
            <th>Course Name</th>
            <th>Category</th>
            <th>Old Price</th>
            <th>New Price</th>
          </tr>
        </thead>
        <tbody>
          {filteredCourses.length > 0 ? (
            filteredCourses.map((course) => (
              <tr key={course.id}>
                <td>{course.id}</td>
                <td>
                  {course.image && (
                    <img
                      src={course.image}
                      alt={course.name}
                      style={{ width: '100px', height: 'auto' }}
                    />
                  )}
                </td>
                <td>{course.name}</td>
                <td>{course.category}</td>
                <td>{course.old_price}</td>
                <td>{course.new_price}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No courses available</td>
            </tr>
          )}
        </tbody>
      </table>
      {/* <CourseChart categoryCounts={categoryCounts} /> */}
    </div>
  );
};

export default CoursesPage;
