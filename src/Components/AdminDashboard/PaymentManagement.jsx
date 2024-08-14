import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PaymentManagement.css';

const PaymentManagement = () => {
  const [payments, setPayments] = useState([]);
  const [sortOrder, setSortOrder] = useState('');
  const [selectedPayments, setSelectedPayments] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:8080/payment/all')
      .then(response => {
        console.log('Payments data:', response.data); 
        setPayments(response.data);
      })
      .catch(error => {
        console.error('Error fetching payments data:', error);
        alert('Failed to fetch payments data. Please check the console for details.');
      });
  }, []);

  const handleSortChange = (event) => {
    const order = event.target.value;
    setSortOrder(order);
    const sortedPayments = [...payments].sort((a, b) => {
      if (order === 'asc') {
        return new Date(a.paidDate) - new Date(b.paidDate);
      } else if (order === 'desc') {
        return new Date(b.paidDate) - new Date(a.paidDate);
      }
      return 0;
    });
    setPayments(sortedPayments);
  };

  const handleSelectPayment = (paymentId) => {
    const isSelected = selectedPayments.includes(paymentId);
    const updatedSelectedPayments = isSelected
      ? selectedPayments.filter(id => id !== paymentId)
      : [...selectedPayments, paymentId];
    setSelectedPayments(updatedSelectedPayments);
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedPayments([]);
    } else {
      setSelectedPayments(payments.map(payment => payment.paymentId));
    }
    setSelectAll(!selectAll);
  };

  const handleDelete = (paymentId) => {
    axios.delete(`http://localhost:8080/payment/deletepayment/${paymentId}`)
      .then(response => {
        setPayments(payments.filter(payment => payment.paymentId !== paymentId));
        setSelectedPayments(selectedPayments.filter(id => id !== paymentId));
        removeFromLocalStorage(paymentId);
      })
      .catch(error => {
        console.error('Error deleting payment:', error);
        alert('Failed to delete payment. Please check the console for details.');
      });
  };

  const handleDeleteAll = () => {
    selectedPayments.forEach(paymentId => {
      handleDelete(paymentId);
    });
  };

  const countPaymentType = (type) => {
    return payments.filter(payment => payment.paymentType === type).length;
  };

  const payOnMeetCount = countPaymentType('Pay on Meet');
  const creditCardCount = countPaymentType('CreditCard');
  const bankTransferCount = countPaymentType('BankTransfer');
  const upiCount = countPaymentType('UPI');

  const storeToLocalStorage = () => {
    const selectedPaymentsData = payments
      .filter(payment => selectedPayments.includes(payment.paymentId))
      .map(payment => ({
        courseName: payment.courseName || 'Unknown Course',
        studentId: payment.student.studentId,
      }));

    console.log('Selected Payments Data:', selectedPaymentsData); 
    localStorage.setItem('bookings', JSON.stringify(selectedPaymentsData));
    console.log('Stored data in local storage:', JSON.parse(localStorage.getItem('bookings')));
  };

  const removeFromLocalStorage = (paymentId) => {
    const bookings = JSON.parse(localStorage.getItem('bookings')) || [];
    const updatedBookings = bookings.filter(
      booking => booking.studentId !== paymentId
    );
    localStorage.setItem('bookings', JSON.stringify(updatedBookings));
    console.log('Updated data in local storage:', updatedBookings);
  };

  return (
    <div>
      <div className="payment-counts-container">
        <div className="payment-count-box">
          <h3>Pay on Meet</h3>
          <p>{payOnMeetCount}</p>
        </div>
        <div className="payment-count-box">
          <h3>Credit Card</h3>
          <p>{creditCardCount}</p>
        </div>
        <div className="payment-count-box">
          <h3>Bank Transfer</h3>
          <p>{bankTransferCount}</p>
        </div>
        <div className="payment-count-box">
          <h3>UPI</h3>
          <p>{upiCount}</p>
        </div>
      </div>
      <br /><br />
      <div className="payment-management">
        <h2>Payment Management</h2>
        <br /><br />
        <div className="sort-controls">
          <select
            value={sortOrder}
            onChange={handleSortChange}
            className="sort-dropdown"
          >
            <option value="">Sort by Date</option>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
        <table className="data-table">
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  checked={selectAll}
                  onChange={handleSelectAll}
                />
              </th>
              <th>Payment ID</th>
              <th>Student ID</th>
              <th>Course</th>
              <th>Payment Type</th>
              <th>Date</th>
              <th>Amount Paid</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {payments.map(payment => (
              <tr key={payment.paymentId}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedPayments.includes(payment.paymentId)}
                    onChange={() => handleSelectPayment(payment.paymentId)}
                  />
                </td>
                <td>{payment.paymentId}</td>
                <td>{payment.student.studentId}</td> 
                <td>{payment.courseName || 'Unknown Course'}</td>
                <td>{payment.paymentType}</td>
                <td>{new Date(payment.paidDate).toLocaleDateString()}</td>
                <td>${payment.amount || 'N/A'}</td>
                <td>
                  <button
                    onClick={() => handleDelete(payment.paymentId)}
                    className='delete-button'
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <br /><br />
        <button
          onClick={() => { storeToLocalStorage(); handleDeleteAll(); }}
          className="delete-all-button"
          disabled={selectedPayments.length === 0}
        >
          Delete Selected
        </button>
      </div>
    </div>
  );
};

export default PaymentManagement;
