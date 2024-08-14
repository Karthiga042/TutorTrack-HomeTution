import React from 'react';
import './BecomeTutorMgmt.css'; // Import the CSS file for styling

const BecomeTutorCount = ({ all, confirmed, pending, declined }) => {
  return (
    <div className="container-stu">
      <div className="module-container-stu">
        <h3>All Requests</h3>
        <p>{all}</p>
      </div>
      <div className="module-container-stu">
        <h3>Confirmed</h3>
        <p>{confirmed}</p>
      </div>
      <div className="module-container-stu">
        <h3>Pending</h3>
        <p>{pending}</p>
      </div>
      <div className="module-container-stu">
        <h3>Declined</h3>
        <p>{declined}</p>
      </div>
    </div>
  );
};

export default BecomeTutorCount;
