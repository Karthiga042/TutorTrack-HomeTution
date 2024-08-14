import React, { useState } from 'react';
import './CSS/Signup.css'; 
import { Link, useNavigate } from 'react-router-dom'; 
import Navbar from '../Components/Navbar/Navbar';
import axios from 'axios';

const Signup = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [contactNumber, setContactNumber] = useState(''); 
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [isFirstNameValid, setIsFirstNameValid] = useState(true);
  const [isLastNameValid, setIsLastNameValid] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isContactNumberValid, setIsContactNumberValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(true);

  const navigate = useNavigate(); 

  const handleFirstNameChange = (e) => {
    const newFirstName = e.target.value;
    setFirstName(newFirstName);
    setIsFirstNameValid(newFirstName.length > 0);
  };

  const handleLastNameChange = (e) => {
    const newLastName = e.target.value;
    setLastName(newLastName);
    setIsLastNameValid(newLastName.length > 0);
  };

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail);
    setIsEmailValid(isValidEmail);
    setEmail(newEmail);
  };

  const handleContactNumberChange = (e) => { 
    const newContactNumber = e.target.value;
    const isValidContactNumber = /^[0-9]{10}$/.test(newContactNumber); 
    setIsContactNumberValid(isValidContactNumber);
    setContactNumber(newContactNumber);
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    const isValidPassword = /^(?=.*[!@#$%^&*_(),.?":{}|<>])(?=.*[a-zA-Z0-9]).{8,}$/.test(newPassword);
    setIsPasswordValid(isValidPassword);
    setPassword(newPassword);
    setIsConfirmPasswordValid(newPassword === confirmPassword);
  };

  const handleConfirmPasswordChange = (e) => {
    const newConfirmPassword = e.target.value;
    setConfirmPassword(newConfirmPassword);
    setIsConfirmPasswordValid(newConfirmPassword === password);
  };

  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
  
    if (
      isFirstNameValid &&
      isLastNameValid &&
      isEmailValid &&
      isContactNumberValid &&
      isPasswordValid &&
      isConfirmPasswordValid
    ) {
      try 
      {
        const response = await axios.post('http://localhost:8080/student/addstudent', {
          firstName,
          lastName,
          email,
          contactNumber,
          gender,
          password
        });
  
        if (response.status === 200) 
        {
          alert('Registered Successfully!');
          navigate('/login1'); 
        }
      } 
      catch (error) 
      {
        console.error('There was an error registering the user:', error);
        alert('Registration failed. Please try again.');
      }
    } 
    else 
    {
      alert('Please fill out all fields correctly.');
    }
  };

  return (
    <div>
      <Navbar />
      <div className='signup'>
        <div className='signup-image'></div>
        <div className='signup-container'>
          <div className='signup-box'>
            <h1>Sign Up</h1>
            <div className='signup-fields'>
              <form onSubmit={handleSignup}>
                <div>
                  <input
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={handleFirstNameChange}
                    className={isFirstNameValid ? '' : 'invalid'}
                    required
                  />
                </div>
                <br />
                <div>
                  <input
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={handleLastNameChange}
                    className={isLastNameValid ? '' : 'invalid'}
                    required
                  />
                </div>
                <br />
                <div>
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={handleEmailChange}
                    className={isEmailValid ? '' : 'invalid'}
                    required
                  />
                  {!isEmailValid && (
                    <p className="error-message">Enter a valid email address.</p>
                  )}
                </div>
                <br />
                <div>
                  <input
                    type="text"
                    placeholder="Contact Number"
                    value={contactNumber}
                    onChange={handleContactNumberChange}
                    className={isContactNumberValid ? '' : 'invalid'} 
                    required
                  />
                  {!isContactNumberValid && (
                    <p className="error-message">Enter a valid contact number.</p>
                  )}
                </div>
                <br />
                <div>
                  <select
                    value={gender}
                    onChange={handleGenderChange}
                    className={gender ? '' : 'invalid'}
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <br />
                <div>
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={handlePasswordChange}
                    className={isPasswordValid ? '' : 'invalid'}
                    required
                  />
                </div>
                <br />
                <div>
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    className={isConfirmPasswordValid ? '' : 'invalid'}
                    required
                  />
                  {!isConfirmPasswordValid && (
                    <p className="error-message">Passwords do not match.</p>
                  )}
                </div>
                <br />
                <button type="submit">Create Account</button>
              </form>
              <p className='signup-login'>
                Already have an account?
                <Link to='/login1'> <span>Click Here</span> </Link>
              </p>
            </div>
            <div className='signup-agree'>
              <input type="checkbox" name='terms' id='terms' required />
              <p>By continuing, I agree to the Terms of Use & Privacy Policy</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
