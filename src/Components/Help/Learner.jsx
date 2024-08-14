import React, { useState } from 'react';
import './Learner.css';
import { ExpandMore, ExpandLess } from '@mui/icons-material'; 
import helpImage from '../Assets/students-help.jpg'; 
import { Link } from 'react-router-dom'; 
import Footer from '../Footer/Footer';
import Navbar from '../Navbar/Navbar';

const Learner = () => {
  const [openQuestionIndex, setOpenQuestionIndex] = useState(null);

  const toggleQuestion = (index) => {
    setOpenQuestionIndex(openQuestionIndex === index ? null : index);
  };

  const questionsAndAnswers = [
    {
      question: 'Is registration mandatory?',
      answer: `Yes, registration is mandatory to find the right tutor. It’s absolutely free of cost.`,
    },
    {
      question: 'How to post my learning requirements?',
      answer: `Posting your learning requirements is easy and absolutely free of cost.

1. Sign into your accounHow to post my learning requirements?
Posting your learning requirements is easy and absolutely free of cost.

1. Sign into your account (If you are a new user, sign up on our platform first).

2. Click on the “Learners” tab and go to “Post Learning Requirement.”t (If you are a new user, sign up on our platform first).

2. Click on the “Learners” tab and go to “Post Learning Requirement.”`,
    },
    {
      question: 'I am a student. Is it possible for me to become a tutor?',
      answer: `Yes. Students are one of the most sought-after tutors on our platform. If you have recently finished your studies or are currently studying, you can provide peer tutoring or mentor them from home. You can even provide support to school students with their homework. Additionally, students of a business school or university have versatile skills that let them offer courses to those students who need help with different subjects. Whether you are a physics, biology, ESL, or Spanish teacher, everyone is welcome on our platform. Students who are looking for part-time or summer tutoring jobs, holiday work, or trying to juggle their studies with their active social life can benefit a lot.`,
    },
    {
      question: 'When can I expect to get replies from tutors?',
      answer: `Once you submit your learning requirement, it will be forwarded to tutors whose preferred categories, subjects and areas correspond to yours. This process may take up anything between 1 to 24 hours to complete. So, we request you to be patient and cooperate with us.

You may start getting emails or calls from tutors based on your privacy settings. If you want to maintain your requirement private and only want to contact tutors of your preferences, you can purchase contact details of tutors`,
    },
    {
      question: 'How to sign up as a student?',
      answer: `Signing up as a student on our platform is very simple.

You can either sign up from Gmail or through Facebook directly. Or create an account in the traditional way.

Go to home page.
Click on the Sign-up tab.
Enter your e-mail ID and click on “Send Code.” The code (One Time Password) will be delivered directly to your mailbox. Enter it in the designated column.
Fill up the form that follows and you are done.
`,
    },
    {
      question: 'Do we provide services in any other countries?',
      answer: `No,But we are trying to reach across the following countries: UK,  Netherlands, France, Spain, USA, Canada,  Kuwait,  UAE,  Malaysia,  Qatar, Kuwait, Saudi Arabia, Bahrain, South Africa, Singapore, Thailand, Philippines, Hong Kong, and India.
`,
    },
    {
      question: 'What if I forget my password?',
      answer: `If you have forgotten your login password, follow the steps mentioned below:

1. Visit the Sign in page.
2. Click on “Forgot Password”.
3. Provide your registered Email ID and click on “Reset Password.” Password recovery instructions would be sent to your email address.
4. Open your mailbox to come across the password recovery link. Click on it, follow the instructions, and reset your password. 

Alternatively, you can also do the following:

Action 1

Write a “request for password reset” mail to our customer support mentioning clearly your:

Name
Registered mobile number
We will get back to you as soon as possible.
`,
    },
  ];

  return (
    <div>
      <Navbar/>
    <div className="teacher-help-center">
      <div className="banner">
        <h1 className="banner-title">Learner Help Center</h1>
        <div className="links">
          <Link to="/" className="link">
            Home |
          </Link>
          <Link to="/help" className="link">
            Help |
          </Link>
          <Link to="/learner" className="link">
            Learner Help Center
          </Link>
        </div>
      </div>

      <div className="help-content">
        <div className="image-container-help-learner">
          <img
            src={helpImage}
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

export default Learner;
