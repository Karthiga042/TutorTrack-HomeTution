import React from 'react';
import './AdminDashboard.css'; 

const StudentsCount = ({ totalCount, femaleCount, maleCount }) => {
  return (
    <div className="container-stu">
      <div className="module-container-stu">
        <h3>Total Students</h3>
        <p>{totalCount}</p>
      </div>
      <div className="module-container-stu">
        <h3>Female Students</h3>
        <p>{femaleCount}</p>
      </div>
      <div className="module-container-stu">
        <h3>Male Students</h3>
        <p>{maleCount}</p>
      </div>
    </div>
  );
};

export default StudentsCount;
