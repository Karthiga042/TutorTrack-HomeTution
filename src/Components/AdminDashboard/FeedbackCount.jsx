import React from 'react';
import './AdminDashboard.css';

const FeedbackCount = ({ totalFeedbacks, readCount, unreadCount }) => {
  return (
    <div className="container-stu">
      <div className="module-container-stu">
        <h3>Total Feedbacks</h3>
        <p>{totalFeedbacks}</p>
      </div>
      <div className="module-container-stu">
        <h3>Read</h3>
        <p>{readCount}</p>
      </div>
      <div className="module-container-stu">
        <h3>Unread</h3>
        <p>{unreadCount}</p>
      </div>
    </div>
  );
};

export default FeedbackCount;
