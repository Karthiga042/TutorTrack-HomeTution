import React, { useState } from 'react';
import './Teacher.css';
import { ExpandMore, ExpandLess } from '@mui/icons-material';
import helpCenterImage from '../Assets/teacher-help.jpg'; 
import { Link } from 'react-router-dom'; 
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

const Teacher = () => {
  const [openQuestionIndex, setOpenQuestionIndex] = useState(null);

  const toggleQuestion = (index) => {
    setOpenQuestionIndex(openQuestionIndex === index ? null : index);
  };

  const questionsAndAnswers = [
    {
      question: 'How does it work?',
      answer: `We are a tutoring marketplace and a community that helps to connect learners with great tutors and trainers. We generate tuition leads (both online and home tutoring) from various internet sources and show you the matching ones based on your skills and location. You can get in touch with those leads and discuss their tuition requirements and mention fees, duration, method of teaching, etc.`,
    },
    {
      question: 'How to delete a Member account on our platform?',
      answer: `Please find below the following steps to delete a Member account:
1. "Sign In" with your login details.
2. Click on the ‘Delete Account’ tab at the bottom of the list of options on the left-hand side.
3. Choose the reason from the dropdown menu.
4. Write the reason in brief.
5. Type “DELETE’. Click on the Delete Account green button.`,
    },
    {
      question: 'I am a student. Is it possible for me to become a tutor?',
      answer: `Yes. Students are one of the most sought-after tutors on our platform. If you have recently finished your studies or are currently studying, you can provide peer tutoring or mentor them from home. You can even provide support to school students with their homework. Additionally, students of a business school or university have versatile skills that let them offer courses to those students who need help with different subjects. Whether you are a physics, biology, ESL, or Spanish teacher, everyone is welcome on our platform. Students who are looking for part-time or summer tutoring jobs, holiday work, or trying to juggle their studies with their active social life can benefit a lot.`,
    },
    {
      question: 'What will happen if I forget my password and registered Email ID?',
      answer: `Here's what you can do:

1. If you wish to provide online tuition only, you can select the online option while filling up the registration form.
2. If you would like to opt for offline or home tuition, select the respective field during the registration procedure.
3. If you are comfortable with both online as well as offline tuition, then select “I can manage both” in the registration form.
4. The option you select will be displayed on your profile.`,
    },
    {
      question: 'How can I provide tuition (Online or Offline)?',
      answer: `Here's what you can do:

1. If you wish to provide online tuition only, you can select the online option while filling up the registration form.
2. If you would like to opt for offline or home tuition, select the respective field during the registration procedure.
3. If you are comfortable with both online as well as offline tuition, then select “I can manage both” in the registration form.
4. The option you select will be displayed on your profile.`,
    },
  ];

  return (
    <div>
      <Navbar/>
    <div className="teacher-help-center">
      <div className="banner">
        <h1 className="banner-title">Teacher Help Center</h1>
        <div className="links">
          <Link to="/" className="link">
            Home |
          </Link>
          <Link to="/help" className="link">
            Help |
          </Link>
          <Link to="/teacher" className="link">
            Teacher Help Center
          </Link>
        </div>
      </div>

      <div className="help-content">
        <div className="image-container-help-teacher">
          <img
            src={helpCenterImage}
            alt="Help Center"
            className="help-center-image"
          />
        </div>

        <div className="questions-container">
          {questionsAndAnswers.map((qa, index) => (
            <div
              className="question"
              key={index}
              onClick={() => toggleQuestion(index)}
            >
              <div className="question-header">
                <h2>{qa.question}</h2>
                {openQuestionIndex === index ? <ExpandLess /> : <ExpandMore />}
              </div>
              {openQuestionIndex === index && (
                <div className="answer">
                  <p>{qa.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
    <Footer/>
    </div>
  );
};

export default Teacher;
