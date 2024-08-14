import React from 'react';
import './AboutUs.css'; 
import { Button } from '@mui/material'; 
import Footer from '../Footer/Footer';
import Navbar from '../Navbar/Navbar';

const AboutUs = () => {
  return (
    <div>
      <Navbar/>
    <div className="about-container">
      <div className="about-content">
        <h1 className="about-heading">Empowering Learning, One Connection at a Time</h1>
        <p className="about-text">
          At TutorTrack, we believe that education is the key to unlocking a world of possibilities. We're passionate about connecting learners with exceptional educators through our cutting-edge remote tutor scheduling platform. Whether you're a student seeking personalized guidance or a tutor ready to make a difference, TutorTrack is here to bridge the gap and transform your educational journey.
        </p>

        <h2 className="mission-heading">Our Mission</h2>
        <p className="mission-text">
          Our mission is simple: to make high-quality education accessible and convenient for everyone, everywhere. We strive to provide a seamless and intuitive experience for students and tutors alike, ensuring that every learning session is tailored to individual needs and goals.
        </p>

        <h2 className="why-choose-heading">Why Choose TutorTrack?</h2>
        <ul className="why-choose-list">
          <li>
            <strong>Personalized Learning:</strong> Our platform matches you with experienced tutors who cater to your unique learning style and goals. Experience customized lessons that fit your schedule and pace.
          </li>
          <li>
            <strong>Convenient Scheduling:</strong> Say goodbye to scheduling hassles. TutorTrack makes booking and managing your tutoring sessions effortless with our user-friendly interface.
          </li>
          <li>
            <strong>Verified Tutors:</strong> We vet all our tutors to ensure they are qualified and dedicated to providing the highest standard of education. Rest assured, you're learning from the best.
          </li>
          <li>
            <strong>Secure and Transparent:</strong> Enjoy a secure environment with clear pricing and a streamlined payment process. Focus on learning while we handle the details.
          </li>
        </ul>

        <div className="cta-buttons">
          <Button variant="contained" color="primary" href="/requestatutor">
            Request a Tutor
          </Button>
          <Button variant="outlined" color="secondary" href="/becomeatutor">
            Become a Tutor
          </Button>
        </div>

        <p className="join-community">
          Join thousands of learners and educators who are revolutionizing the way education happens. Whether you're looking to enhance your skills, achieve academic excellence, or share your expertise with eager students, TutorTrack is your gateway to a brighter, more connected future.
        </p>

        <p className="discover-future">
          Discover the future of learning with TutorTrack – where education meets innovation.
        </p>
      </div>
    </div>
      <Footer/>
      </div>
  );
};

export default AboutUs;
