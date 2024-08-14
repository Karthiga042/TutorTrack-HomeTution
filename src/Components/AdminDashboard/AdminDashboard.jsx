import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import StaffPage from './StaffPage';
import StudentPage from './StudentPage';
import CoursesPage from './CoursesPage';
import FeedbackManagement from './FeedbackManagement';
import StaffChart from './StaffChart';
import StudentChart from './StudentChart';
import CourseChart from './CourseChart';
import PaymentManagement from './PaymentManagement';
import BecomeTutorManagement from './BecomeTutorManagement';
import RequestTutorManagement from './RequestTutorManagment';
import './AdminDashboard.css';
import CourseBooking from './CourseBooking';

const AdminDashboard = () => {
  const [activeChart, setActiveChart] = useState('overview');
  const [dailyEnrollments, setDailyEnrollments] = useState([]);
  const [categoryData, setCategoryData] = useState({});
  const [courseData, setCourseData] = useState([]); 

  const fetchDailyEnrollments = async () => {
    try {
      const response = await axios.get('http://localhost:8080/student/all');
      if (response.status === 200) {
        const enrollments = response.data;
        const dailyData = {};

        enrollments.forEach(enrollment => {
          const day = moment(enrollment.date).format('YYYY-MM-DD');
          dailyData[day] = (dailyData[day] || 0) + 1;
        });

        const sortedDates = Object.keys(dailyData).sort((a, b) => moment(a).diff(moment(b)));
        const enrollmentsArray = sortedDates.map(date => ({
          date,
          count: dailyData[date]
        }));

        setDailyEnrollments(enrollmentsArray);
      } else {
        console.error('Failed to fetch data:', response.statusText);
      }
    } catch (error) {
      console.error('There was an error fetching the daily enrollments data:', error);
    }
  };

  const fetchStaffData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/staff/all');
      if (response.status === 200) {
        const staff = response.data;
        const categorizedData = staff.reduce((acc, member) => {
          if (member.subject) {
            acc[member.subject] = (acc[member.subject] || 0) + 1;
          }
          return acc;
        }, {});

        setCategoryData(categorizedData);
      } else {
        console.error('Failed to fetch staff data:', response.statusText);
      }
    } catch (error) {
      console.error('There was an error fetching the staff data:', error);
    }
  };

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:8080/course/all');
        const courses = response.data;

        const categoryCounts = courses.reduce((acc, course) => {
          acc[course.category] = (acc[course.category] || 0) + 1;
          return acc;
        }, {});

        const data = Object.keys(categoryCounts).map(category => ({
          category,
          count: categoryCounts[category],
        }));

        setCourseData(data);
      } catch (error) {
        console.error('Error fetching course data:', error);
      }
    };

    fetchCourses();
  }, []);

  useEffect(() => {
    fetchDailyEnrollments();
    fetchStaffData();
  }, []);

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <h3>Admin Dashboard</h3>
        <ul>
          <li onClick={() => setActiveChart('overview')}>Overview</li>
          <li onClick={() => setActiveChart('student')}>Student Enrollments</li>
          <li onClick={() => setActiveChart('staff')}>Staff Registrations</li>
          <li onClick={() => setActiveChart('course')}>Course Distribution</li>
          <li onClick={() => setActiveChart('feedback')}>Feedback Management</li>
          <li onClick={() => setActiveChart('payment')}>Payment Management</li>
          <li onClick={() => setActiveChart('becometutormgmt')}>Become Tutor Management</li>
          <li onClick={() => setActiveChart('requesttutormgmt')}>Request Tutor Management</li>
          <li onClick={() => setActiveChart('coursebooking')}>Course Booking Management</li>
        </ul>
      </div>
      <div className="content">
        <h1>Admin Dashboard</h1>
        <br /><br />
        {activeChart === 'overview' && (
          <div className="overview-section">
            <div className="chart-container">
              <h2>Staff Registrations</h2>
              <StaffChart data={categoryData} />
            </div>
            <div className="chart-container">
              <h2>Student Enrollments Till Date</h2>
              <StudentChart enrollments={dailyEnrollments} />
            </div>
            {/* <div className="chart-container">
              <h2>Course Distribution</h2>
              <CourseChart data={courseData} />
            </div> */}
          </div>
        )}
        {activeChart === 'student' && (
          <>
            <h2>Student Enrollments</h2>
            <StudentPage />
          </>
        )}
        {activeChart === 'staff' && (
          <>
            <h2>Staff Registrations</h2>
            <StaffPage />
          </>
        )}
        {activeChart === 'course' && (
          <>
            <h2>Course Distribution</h2>
            <CoursesPage />
          </>
        )}
        {activeChart === 'feedback' && (
          <>
            <FeedbackManagement />
          </>
        )}
        {activeChart === 'payment' && (
          <>
            <PaymentManagement />
          </>
        )}
        {activeChart === 'requesttutormgmt' && (
          <>
            <RequestTutorManagement />
          </>
        )}
        {activeChart === 'becometutormgmt' && (
          <>
            <BecomeTutorManagement />
          </>
        )}
        {activeChart === 'coursebooking' && (
          <>
            <CourseBooking />
          </>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
