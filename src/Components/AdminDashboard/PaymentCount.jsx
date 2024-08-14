import React from 'react';
import './PaymentManagement.css'; 

const PaymentCount = ({ payOnMeetCount, onlinePaymentCount }) => {
  return (
    <div className="container-stu">
      <div className="module-container-stu">
        <h3>Pay on Meet</h3>
        <p>{payOnMeetCount}</p>
      </div>
      <div className="module-container-stu">
        <h3>Online Payment</h3>
        <p>{onlinePaymentCount}</p>
      </div>
    </div>
  );
};

export default PaymentCount;
