import React from 'react';
import './AdminDashboard.css'; 

const StaffCount = ({ totalCount, maleCount, femaleCount }) => {
  return (
    <div className="container-stu">
      <div className="module-container-stu">
        <h3>Total Staff</h3>
        <p>{totalCount}</p>
      </div>
      <div className="module-container-stu">
        <h3>Male Staff</h3>
        <p>{maleCount}</p>
      </div>
      <div className="module-container-stu">
        <h3>Female Staff</h3>
        <p>{femaleCount}</p>
      </div>
    </div>
  );
};

export default StaffCount;
