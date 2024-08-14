import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './StaffDetails.css';
import Footer from '../Footer/Footer';
import Navbar from '../Navbar/Navbar';

const categories = ['All', 'Computer Science', 'Mathematics', 'English', 'Economics', 'Biology'];

const StaffDetails = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [staff, setStaff] = useState([]);
  const [feedbacks, setFeedbacks] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const response = await axios.get('http://localhost:8080/staff/all');
        const fetchedStaff = response.data;
        if (Array.isArray(fetchedStaff)) {
          setStaff(fetchedStaff);
        } else {
          console.error('Unexpected data format:', fetchedStaff);
        }
      } catch (error) {
        console.error('Error fetching staff data:', error);
      }
    };

    fetchStaff();
  }, []);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:8080/feedback/all');
        const feedbackData = response.data;
        if (Array.isArray(feedbackData)) {
          const feedbacksByStaff = feedbackData.reduce((acc, feedback) => {
            acc[feedback.staff?.staffId] = feedback.feedback;
            return acc;
          }, {});
          setFeedbacks(feedbacksByStaff);
        } else {
          console.error('Unexpected feedback data format:', feedbackData);
        }
      } catch (error) {
        console.error('Error fetching feedback data:', error.response?.data || error.message);
        setError('Failed to load feedback data from the backend.');
      } finally {
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, []);

  useEffect(() => {
    const savedCategory = localStorage.getItem('selectedCategory');
    if (savedCategory) {
      setSelectedCategory(savedCategory);
    }
  }, []);

  const filteredStaff = selectedCategory === 'All'
    ? staff
    : staff.filter(member => member.subject.toLowerCase() === selectedCategory.toLowerCase());

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    localStorage.setItem('selectedCategory', category);
  };

  return (
    <div>
      <Navbar />
      {/* <div className="category-filter">
        {categories.map(category => (
          <button
            key={category}
            className={`filter-button-staff ${selectedCategory.toLowerCase() === category.toLowerCase() ? 'active' : ''}`}
            onClick={() => handleCategoryClick(category)}
          >
            {category}
          </button>
        ))}
      </div> */}
      <div className="staff-container">
        {loading && <p>Loading feedback...</p>}
        {error && <p>{error}</p>}
        {filteredStaff.map(staffMember => (
          <div key={staffMember.staffId} className="staff-card">
            <Link to={`/staff/${staffMember.staffId}`}>
              <img src={`http://localhost:8080/staff/${staffMember.staffId}/image`} alt={staffMember.firstName} className="staff-image" />
            </Link>
            <div className="staff-info">
              <h2 className="staff-name">{staffMember.firstName} {staffMember.lastName}</h2>
              <p className="staff-qualification">{staffMember.qualification}</p>
              <p className="staff-subject">{staffMember.subject}</p>
              <p className="staff-feedback">Feedback:
                {feedbacks[staffMember.staffId] || 'No feedback found for this staff member'}
              </p>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default StaffDetails;
