import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './BecomeTutor2.css'; 
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import axios from 'axios';
import becometutor2img from "../Assets/teacher.jpg";

const BecomeTutor = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    location: '',
    email: '',
    gender: '',
    qualification: '',
    mobile: '',
    subject: '',
  });

  const [errors, setErrors] = useState({
    firstname: '',
    lastname: '',
    location: '',
    email: '',
    gender: '',
    qualification: '',
    mobile: '',
    subject: '',
  });

  const [isFormValid, setIsFormValid] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    validateForm({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = (data) => {
    const newErrors = {};
    let isValid = true;

    for (const key in data) {
      if (!data[key]) {
        newErrors[key] = 'This field is required';
        isValid = false;
      } else if (key === 'email' && !/\S+@\S+\.\S+/.test(data[key])) {
        newErrors[key] = 'Invalid email address';
        isValid = false;
      } else if (key === 'mobile' && !/^\d{10}$/.test(data[key])) {
        newErrors[key] = 'Invalid mobile number';
        isValid = false;
      } else {
        newErrors[key] = '';
      }
    }

    setErrors(newErrors);
    setIsFormValid(isValid);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isFormValid) {
      try {
        const response = await axios.post('http://localhost:8080/becometutor/addbecometutor', {
          firstName: formData.firstname,
          lastName: formData.lastname,
          location: formData.location,
          email: formData.email,
          gender: formData.gender,
          qualification: formData.qualification,
          contactNumber: formData.mobile,
          subject: formData.subject,
          status: 'pending',
        });
        if (response.status === 200) {
          alert('Form submitted successfully');
          navigate('/staffconfirmation');
        } else {
          alert('Form submission failed');
        }
      } catch (error) {
        console.error('Error submitting form:', error.response ? error.response.data : error.message);
        alert('Error submitting form');
      }
    } else {
      alert('Please fill out all fields correctly.');
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="image-container-req">
          <img src={becometutor2img} alt="Tutor" /> 
        </div>
        <div className="content-container">
          <h2>Become a Tutor</h2>
          <form onSubmit={handleSubmit}>
            <div className="field">
              <input
                type="text"
                id="firstname"
                name="firstname"
                value={formData.firstname}
                onChange={handleChange}
                placeholder="First Name"
              />
              {errors.firstname && <p className="error">{errors.firstname}</p>}
            </div>
            <div className="field">
              <input
                type="text"
                id="lastname"
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
                placeholder="Last Name"
              />
              {errors.lastname && <p className="error">{errors.lastname}</p>}
            </div>
            <div className="field">
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Location"
              />
              {errors.location && <p className="error">{errors.location}</p>}
            </div>
            <div className="field">
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
              />
              {errors.email && <p className="error">{errors.email}</p>}
            </div>
            <div className="field">
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              {errors.gender && <p className="error">{errors.gender}</p>}
            </div>
            <div className="field">
              <select
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
              >
                <option value="">Select Subject</option>
                <option value="mathematics">Mathematics</option>
                <option value="english">English</option>
                <option value="computerscience">Computer Science</option>
                <option value="biology">Biology</option>
                <option value="economics">Economics</option>
              </select>
              {errors.subject && <p className="error">{errors.subject}</p>}
            </div>
            <div className="field">
              <input
                type="text"
                id="qualification"
                name="qualification"
                value={formData.qualification}
                onChange={handleChange}
                placeholder="Qualification"
              />
              {errors.qualification && <p className="error">{errors.qualification}</p>}
            </div>
            <div className="field">
              <input
                type="tel"
                id="mobile"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                placeholder="Mobile Number"
              />
              {errors.mobile && <p className="error">{errors.mobile}</p>}
            </div>
            <button type="submit" disabled={!isFormValid}>
              Submit
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BecomeTutor;
