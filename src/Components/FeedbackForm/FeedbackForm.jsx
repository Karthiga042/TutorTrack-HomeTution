import React, { useState, useEffect } from 'react';
import { TextField, Button, Rating, Box, Typography, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import './FeedbackForm.css'; 
import feedbackimg from '../Assets/feedback.jpg'; 
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import axios from 'axios';

const FeedbackForm = () => {
  const [feedback, setFeedback] = useState({
    studentEmail: '',
    staffEmail: '',
    rating: 0,
    comments: '',
  });
  const [staffList, setStaffList] = useState([]);

  useEffect(() => {
    const fetchAndStoreData = async () => {
      try {
        const studentsResponse = await axios.get('http://localhost:8080/student/all');
        const studentsData = studentsResponse.data;
        localStorage.setItem('students', JSON.stringify(studentsData.map(student => ({
          studentId: student.studentId,
          email: student.email
        }))));
        
        const staffResponse = await axios.get('http://localhost:8080/staff/all');
        const staffData = staffResponse.data;
        setStaffList(staffData); 
        localStorage.setItem('staff', JSON.stringify(staffData.map(staff => ({
          staffId: staff.staffId,
          email: staff.email,
          firstName: staff.firstName,
          lastName: staff.lastName
        }))));
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchAndStoreData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFeedback({ ...feedback, [name]: value });
  };

  const handleRatingChange = (event, newValue) => {
    setFeedback({ ...feedback, rating: newValue });
  };

  const handleStaffChange = async (event) => {
    const staffEmail = event.target.value;
    setFeedback(prevFeedback => ({
      ...prevFeedback,
      staffEmail: staffEmail
    }));

    try {
      const staffData = JSON.parse(localStorage.getItem('staff')) || [];
      const selectedStaff = staffData.find(staff => staff.email === staffEmail);

      if (selectedStaff) {
        console.log('Selected Staff Details:', selectedStaff);
        setFeedback(prevFeedback => ({
          ...prevFeedback,
          staffId: selectedStaff.staffId
        }));
      } else {
        const response = await axios.get(`http://localhost:8080/staff/email/${staffEmail}`);
        const staffDetails = response.data;
        localStorage.setItem('staff', JSON.stringify([...staffData, staffDetails]));
        setFeedback(prevFeedback => ({
          ...prevFeedback,
          staffId: staffDetails.staffId
        }));
      }
    } catch (error) {
      console.error('Error fetching staff details:', error);
    }
  };

  const postFeedbacksToBackend = async () => {
    try {
      const storedFeedbacks = JSON.parse(localStorage.getItem('feedbacks')) || [];

      if (storedFeedbacks.length === 0) {
        console.log('No feedbacks to post.');
        return;
      }

      await Promise.all(storedFeedbacks.map(async (feedback) => {
        try {
          await axios.post('http://localhost:8080/feedback/addfeedback', {
            student: {
              studentId: feedback.studentId,
              name: feedback.studentName || 'Unknown'
            },
            staff: {
              staffId: feedback.staffId,
              name: feedback.staffName || 'Unknown'
            },
            studentEmail: feedback.studentEmail,
            staffEmail: feedback.staffEmail,
            feedback: feedback.comments,
            status: feedback.isRead ? "Read" : "Unread",
            date: feedback.date
          });
        } catch (error) {
          console.error('Error posting feedback:', error.response?.data || error.message);
          throw error; 
        }
      }));

      localStorage.removeItem('feedbacks');
      console.log('Feedback data stored successfully.');

    } catch (error) {
      console.error('Error storing feedback:', error.response?.data || error.message);
      alert('Failed to store feedback in backend.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const studentsData = JSON.parse(localStorage.getItem('students')) || [];
    console.log('Students Data:', studentsData);
  
    const student = studentsData.find(s =>
      s.email.trim().toLowerCase() === feedback.studentEmail.trim().toLowerCase()
    );
  
    if (student) {
      feedback.studentId = student.studentId;
    } else {
      console.error('Student not found');
      alert('Student not found');
      return;
    }
  
    const staffData = JSON.parse(localStorage.getItem('staff')) || [];
    console.log('Staff Data:', staffData);
  
    const staff = staffData.find(s => s.staffId === feedback.staffId);
  
    if (staff) {
      feedback.staffId = staff.staffId;
    } else {
      console.error('Staff not found');
      alert('Staff not found');
      return;
    }
  
    const feedbackId = Date.now();
    const currentDate = new Date().toISOString();
  
    console.log('Feedback Data:', { ...feedback, feedbackId, date: currentDate });

    const existingFeedbacks = JSON.parse(localStorage.getItem('feedbacks')) || [];
    localStorage.setItem('feedbacks', JSON.stringify([...existingFeedbacks, { ...feedback, feedbackId, date: currentDate }]));
    
    alert("Feedback submitted!");

    await postFeedbacksToBackend();
  
    setFeedback({
      studentEmail: '',
      staffEmail: '',
      rating: 0,
      comments: '',
    });
  };
  
  return (
    <div>
      <Navbar />
      <div className="feedback-form-container">
        <div className="image-section">
          <img src={feedbackimg} alt="Feedback" />
        </div>
        <div className="form-section">
          <div className="feedback-form">
            <h2>Submit Feedback</h2>
            <form onSubmit={handleSubmit} className="feedback-form-content">
              <TextField
                name="studentEmail"
                label="Student Email"
                value={feedback.studentEmail}
                onChange={handleChange}
                fullWidth
                required
              />
              <FormControl fullWidth required>
                <InputLabel id="staff-select-label">Staff</InputLabel>
                <Select
                  labelId="staff-select-label"
                  name="staffEmail"
                  value={feedback.staffEmail}
                  onChange={handleStaffChange}
                >
                  {staffList.map(staff => (
                    <MenuItem key={staff.staffId} value={staff.email}>
                      {staff.email}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Box className="rating-container">
                <Typography className="rating-label">Rating</Typography>
                <Rating
                  name="rating"
                  value={feedback.rating}
                  onChange={handleRatingChange}
                  precision={0.5}
                />
              </Box>
              <TextField
                name="comments"
                label="Comments"
                value={feedback.comments}
                onChange={handleChange}
                multiline
                rows={4}
                fullWidth
                required
              />
              <Button type="submit" variant="contained" color="primary" className="submit-button">
                Submit Feedback
              </Button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FeedbackForm;
