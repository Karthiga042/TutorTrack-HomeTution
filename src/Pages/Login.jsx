// src/Login.js
import React from 'react';
import { Button, Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import './CSS/Login.css'; 
import tutor from '../Components/Assets/login_common1.jpg';
import student from '../Components/Assets/login_common2.jpg';
import Navbar from '../Components/Navbar/Navbar';
import newImage from '../Components/Assets/loginpagenew.jpg'; 

const Login = () => {
  return (
    <div>
      <Navbar/>
    <div className='login-page'>
      <img src={newImage} alt="Decorative background" className="left-image" />
      <Box className="login-container">
        <Box className="section tutor-section">
          <Box className="section-content">
            <Typography variant="body1" className="description">
             If your are an existing user, you can connect with students who need your expertise. Join our platform to start offering your tutoring services and make a difference in students' learning journeys.
            </Typography>
            <Button
              sx={{ mt: 2, width: '400px', height: '80px', fontSize: '16px', backgroundColor: '#009688', color: 'white', '&:hover': { backgroundColor: '#00796b' } }}
              variant="contained"
              component={Link}
              to="/login1"
            >
              Log In
            </Button>
          </Box>
          <img src={tutor} alt="Illustration of a tutor" className="section-image" />
        </Box>

        <Box className="section student-section">
          <Box className="section-content">
            <Typography variant="body1" className="description">
              If you are a new student, you can find qualified tutors who match your learning needs. Explore our platform to discover tutors who can help you achieve your academic goals.
            </Typography>
            <Button
              sx={{ mt: 2, width: '400px', height: '80px', fontSize: '16px', backgroundColor: '#009688', color: 'white', '&:hover': { backgroundColor: '#00796b' } }}
              variant="contained"
              component={Link}
              to="/signup"
            >
              Sign Up
            </Button>
          </Box>
          <img src={student} alt="Illustration of a student" className="section-image" />
        </Box>
      </Box>
    </div>
    </div>
  );
};

export default Login;
