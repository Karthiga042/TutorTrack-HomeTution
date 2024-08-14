import React, { useState, useEffect } from 'react';
import './Profile.css'; 
import { TextField, Button, Typography, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person'; 
import Footer from '../Footer/Footer';
import Navbar from '../Navbar/Navbar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Profile = ({ onProfileUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    studentId: '',
    firstName: '',
    lastName: '',
    email: '',
    gender: '',
    contactNumber: '',
    address: '',
  });
  const [isLoggedIn, setIsLoggedIn] = useState(true); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const storedUser = localStorage.getItem('user');
        const user = JSON.parse(storedUser);

        const response = await axios.get('http://localhost:8080/student/all');
        const currentUser = response.data.find(student => student.email === user.email);

        if (currentUser) {
          setProfileData({
            studentId: currentUser.studentId,
            firstName: currentUser.firstName,
            lastName: currentUser.lastName,
            email: currentUser.email,
            gender: currentUser.gender,
            contactNumber: currentUser.contactNumber,
            address: currentUser.address,
          });
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error('Error fetching student data:', error);
        setIsLoggedIn(false);
      }
    };

    if (isLoggedIn) {
      fetchProfileData();
    }
  }, [isLoggedIn, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    setIsEditing(false);
    try {
      console.log('Updating profile data:', profileData);
      const updateResponse = await axios.put(`http://localhost:8080/student/updatestudent/${profileData.studentId}`, profileData);

      if (updateResponse.status === 200) {
        console.log('Profile data saved:', profileData);
        localStorage.setItem('user', JSON.stringify(profileData));
        onProfileUpdate(); 
      } else {
        console.error('Error updating profile:', updateResponse.statusText);
      }
    } catch (error) {
      console.error('Error saving profile data:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setProfileData({
      studentId: '',
      firstName: '',
      lastName: '',
      email: '',
      gender: '',
      contactNumber: '',
      address: '',
    });
    setIsLoggedIn(false);
    alert("Logged out of account!");
    navigate('/login');
  };

  return (
    <div>
      <Navbar />
      <div className="profile-container">
        <div className="profile-banner">
          {/* 
          <img src="/path/to/banner-image.jpg" alt="Profile Banner" className="banner-image" /> */}
        </div>
        <div className="profile-background">
          <div className="profile-content">
            <div className="profile-details">
              {isLoggedIn ? (
                <>
                  <div className="profile-header">
                    <PersonIcon fontSize="large" className="profile-avatar" />
                      <IconButton onClick={handleEditClick} color="primary">
                        <EditIcon />
                      </IconButton>
                    <div className="profile-header-text">
                      <Typography variant="h4" gutterBottom>Hi {profileData.firstName} {profileData.lastName}!</Typography>
                    </div>
                  </div>
                  <div className="profile-info">
                    <TextField
                      label="First Name"
                      name="firstName"
                      value={profileData.firstName}
                      onChange={handleChange}
                      disabled={!isEditing}
                      fullWidth
                      margin="normal"
                    />
                    <TextField
                      label="Last Name"
                      name="lastName"
                      value={profileData.lastName}
                      onChange={handleChange}
                      disabled={!isEditing}
                      fullWidth
                      margin="normal"
                    />
                    <TextField
                      label="Email"
                      name="email"
                      value={profileData.email}
                      onChange={handleChange}
                      disabled={!isEditing}
                      fullWidth
                      margin="normal"
                    />
                    <TextField
                      label="Gender"
                      name="gender"
                      value={profileData.gender}
                      onChange={handleChange}
                      disabled={!isEditing}
                      fullWidth
                      margin="normal"
                    />
                    <TextField
                      label="Contact Number"
                      name="contactNumber"
                      value={profileData.contactNumber}
                      onChange={handleChange}
                      disabled={!isEditing}
                      fullWidth
                      margin="normal"
                    />
                    {/* <TextField
                      label="Address"
                      name="address"
                      value={profileData.address}
                      onChange={handleChange}
                      disabled={!isEditing}
                      fullWidth
                      margin="normal"
                    /> */}
                  </div>
                  {isEditing && (
                    <div className="profile-actions">
                      <Button onClick={handleSaveClick} variant="contained" color="primary" startIcon={<SaveIcon />} className="action-button">
                        Save
                      </Button>
                    </div>
                  )}
                </>
              ) : (
                <Typography variant="h6" align="center">
                  Please log in to view your profile.
                </Typography>
              )}
              <div className="profile-actions">
                {isLoggedIn && (
                  <Button onClick={handleLogout} variant="outlined" color="secondary" startIcon={<LogoutIcon />} className="action-button">
                    Logout
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
