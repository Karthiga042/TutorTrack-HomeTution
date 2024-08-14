import React from 'react';
import './ContactUs.css'; // Import the CSS file
import Footer from '../Footer/Footer';
import Navbar from '../Navbar/Navbar';

const ContactUs = () => {
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    // Display alert
    alert('Message Sent');
  };

  return (
    <div>
      <Navbar/>
      <div className="contact-container">
        <div className="contact-form-box">
          <h1 className="contact-form-heading">Contact Us</h1>
          <form onSubmit={handleSubmit}>
            {/* Topic Selection */}
            <div className="contact-form-field">
              <label htmlFor="topic">Choose Topic</label>
              <select id="topic" name="topic" required>
                <option value="">Choose Topic</option>
                <option value="general">General Enquiry</option>
                <option value="business">Business Enquiry</option>
                {/* Add more options as needed */}
              </select>
            </div>
            
            {/* Name Field */}
            <div className="contact-form-field">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" name="name" required />
            </div>

            {/* Email Field */}
            <div className="contact-form-field">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" required />
            </div>

            {/* Mobile Field */}
            <div className="contact-form-field">
              <label htmlFor="mobile">Mobile (Optional)</label>
              <input type="tel" id="mobile" name="mobile" />
            </div>

            {/* Location Field */}
            <div className="contact-form-field">
              <label htmlFor="location">Location</label>
              <select id="location" name="location">
                <option value="">Select Location</option>
                <option value="chennai">Chennai</option>
                <option value="mumbai">Mumbai</option>
                <option value="delhi">Delhi</option>
                <option value="hyderabad">Hyderabad</option>
                <option value="puducherry">Puducherry</option>
              </select>
            </div>

            {/* Your Message Field */}
            <div className="contact-form-field">
              <label htmlFor="message">Your Message</label>
              <textarea id="message" name="message" placeholder="Write your message" required></textarea>
            </div>

            {/* Submit Button */}
            <button type="submit" className="contact-form-button">Send Message</button>
          </form>

          {/* Contact Information */}
          <div className="contact-info">
            <p>Contact With Us:</p>
            <p>General Enquiry: contact@tutortrack.com</p>
            <p>Business Enquiry: contact@tutortrack.com</p>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default ContactUs;
