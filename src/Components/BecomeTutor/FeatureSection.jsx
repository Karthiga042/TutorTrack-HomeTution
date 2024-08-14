import React from 'react';
import './Features.css';
import workAnywhereImg from '../Assets/work_anywhere.jpg'; 
import flexibleTimingsImg from '../Assets/flexible_timings.jpg'; 
import earnLivingImg from '../Assets/earn_living.jpg'; 
import { Button } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Link } from 'react-router-dom';

const FeatureSection = () => {
  return (
    <div className="features-container">
      <div className="feature-module">
        <div className="feature-content">
          <h1>Work Anywhere</h1>
          <p>
            Thousands of students are looking for the perfect tutor like you on MyPrivateTutor. Work from the comfort of your home whenever you want, wherever you are.
          </p>
          <Link to="/signup">
          <Button className="feature-button" variant="contained" endIcon={<ArrowForwardIcon />}>
            Sign Up as Tutor
          </Button></Link>
        </div>
        <div className="feature-image">
          <img src={workAnywhereImg} alt="Work Anywhere" />
        </div>
      </div>

      <div className="feature-module reverse">
        <div className="feature-image">
          <img src={flexibleTimingsImg} alt="Flexible Timings" />
        </div>
        <div className="feature-content">
          <h1>Flexible Timings</h1>
          <p>
            Set your work timings and rates. Add information that matters - qualification, timings, fees, tutoring success stories, etc. Be your own boss.
          </p>
          <Link to="/signup">
          <Button className="feature-button" variant="contained" endIcon={<ArrowForwardIcon />}>
            Sign Up as Tutor
          </Button></Link>
        </div>
      </div>

      <div className="feature-module">
        <div className="feature-content">
          <h1>Earn A Living</h1>
          <p>
            Earn while living your passion. Start your digital journey on MyPrivateTutor, create your free profile, and increase your earnings. Get involved NOW!
          </p>
          <Link to="/signup">
          <Button className="feature-button" variant="contained" endIcon={<ArrowForwardIcon />}>
            Sign Up as Tutor
          </Button></Link>
        </div>
        <div className="feature-image">
          <img src={earnLivingImg} alt="Earn A Living" />
        </div>
      </div>
    </div>
  );
};

export default FeatureSection;
