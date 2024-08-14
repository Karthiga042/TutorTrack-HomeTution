import React, { useState, useEffect } from "react";
import "./Payment.css";
import paymentImage from '../Assets/admin_login2.jpg';
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { useNavigate } from "react-router-dom";
import { IconButton, Tooltip, Typography, TextField, MenuItem, Select, FormControl } from "@mui/material";
import { Payment as PaymentIcon, CreditCard as CreditCardIcon, Smartphone as SmartphoneIcon, AccountBalance as AccountBalanceIcon } from "@mui/icons-material";
import axios from 'axios';

const PaymentSelection = () => {
  const navigate = useNavigate();

  const [course, setCourse] = useState({
    name: localStorage.getItem('courseName') || 'Unknown Course',
    new_price: localStorage.getItem('newPrice') || 'N/A',
  });

  const [studentId, setStudentId] = useState('');

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentId'));
    const currentStudentId = currentUser ? currentUser.studentId : 'Unknown';

    setStudentId(currentStudentId);

    if (currentStudentId) {
      localStorage.setItem('studentId', currentStudentId);
    }
  }, []);

  const coursePrice = course.new_price ? Number(course.new_price).toFixed(2) : 'N/A';

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [cardType, setCardType] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cvv, setCvv] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [upiService, setUpiService] = useState("");
  const [upiId, setUpiId] = useState("");
  const [bankName, setBankName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handlePaymentMethodClick = (method) => {
    setSelectedPaymentMethod(method);
    setError("");
  };

  const handleSubmit = () => {
    if (!selectedPaymentMethod) {
      setError("Please select a payment method");
      return;
    }

    const paymentData = {
      paymentType: selectedPaymentMethod,
      amount: course.new_price || 0,
      date: new Date().toISOString().split('T')[0],
      cardType,
      cardNumber,
      cvv,
      expiryDate,
      upiService,
      upiId,
      bankName,
      username,
      password,
      student: { studentId }, 
      courseName: course.name, 
    };

    axios.post('http://localhost:8080/payment/addpayment', paymentData)
      .then(response => {
        console.log("Payment Data Submitted:", response.data);
        localStorage.setItem('submittedStudentId', paymentData.student.studentId); // Ensure it's specific to this payment
        navigate("/confirmation");
      })
      .catch(error => {
        console.error('Error submitting payment data:', error);
        setError('Failed to submit payment data. Please check the console for details.');
      });
  };

  return (
    <div>
      <Navbar />
      <div className="payment-selection">
        <div className="image-container-pay">
          <img src={paymentImage} alt="Payment Options" />
        </div>
        <div className="payment-box">
          <Typography variant="h4" gutterBottom>Select Payment Method</Typography>
          <br /><br />
          <div className="course-info">
            <Typography variant="h6" className="course-detail">Course: {course.name}</Typography>
            <Typography variant="h6" className="course-detail">Amount to Pay: ${coursePrice}</Typography>
            <Typography variant="h6" className="course-detail">Student ID: {studentId}</Typography>
          </div>
          <br /><br />
          <div className="payment-options">
            <div className="payment-option">
              <Tooltip title="Pay on Meet" placement="top">
                <IconButton
                  className={`payment-button ${selectedPaymentMethod === "Pay on Meet" ? "selected" : ""}`}
                  onClick={() => handlePaymentMethodClick("Pay on Meet")}
                >
                  <PaymentIcon />
                </IconButton>
              </Tooltip>
              <Typography variant="h6">Pay on Meet</Typography>
              <Typography variant="body1">
                Choose this option if you prefer to handle the payment directly during your meeting with the tutor.
              </Typography>
            </div>

            <div className="payment-option">
              <Tooltip title="UPI" placement="top">
                <IconButton
                  className={`payment-button ${selectedPaymentMethod === "UPI" ? "selected" : ""}`}
                  onClick={() => handlePaymentMethodClick("UPI")}
                >
                  <SmartphoneIcon />
                </IconButton>
              </Tooltip>
              <Typography variant="h6">UPI</Typography>
              <Typography variant="body1">
                Choose this option for payments via UPI.
              </Typography>
            </div>

            <div className="payment-option">
              <Tooltip title="Card" placement="top">
                <IconButton
                  className={`payment-button ${selectedPaymentMethod === "CreditCard" ? "selected" : ""}`}
                  onClick={() => handlePaymentMethodClick("CreditCard")}
                >
                  <CreditCardIcon />
                </IconButton>
              </Tooltip>
              <Typography variant="h6">Card</Typography>
              <Typography variant="body1">
                Choose this option to pay using your credit/Debit card.
              </Typography>
            </div>

            <div className="payment-option">
              <Tooltip title="Bank Transfer" placement="top">
                <IconButton
                  className={`payment-button ${selectedPaymentMethod === "BankTransfer" ? "selected" : ""}`}
                  onClick={() => handlePaymentMethodClick("BankTransfer")}
                >
                  <AccountBalanceIcon />
                </IconButton>
              </Tooltip>
              <Typography variant="h6">Bank Transfer</Typography>
              <Typography variant="body1">
                Choose this option to transfer funds directly from your bank account.
              </Typography>
            </div>
          </div>
          
          {selectedPaymentMethod === "CreditCard" && (
            <div className="payment-details">
              <FormControl fullWidth margin="normal">
                <Select
                  value={cardType}
                  onChange={(e) => setCardType(e.target.value)}
                  displayEmpty
                  inputProps={{ 'aria-label': 'Card Type' }}
                >
                  <MenuItem value="" disabled>Select Card Type</MenuItem>
                  <MenuItem value="Credit">Credit Card</MenuItem>
                  <MenuItem value="Debit">Debit Card</MenuItem>
                </Select>
              </FormControl>
              <TextField
                fullWidth
                margin="normal"
                placeholder="Card Number"
                type="text"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
              />
              <TextField
                fullWidth
                margin="normal"
                placeholder="CVV"
                type="text"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
              />
              <TextField
                fullWidth
                margin="normal"
                placeholder="Expiry Date (MM/YY)"
                type="text"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
              />
            </div>
          )}

          {selectedPaymentMethod === "UPI" && (
            <div className="payment-details">
              <FormControl fullWidth margin="normal">
                <Select
                  value={upiService}
                  onChange={(e) => setUpiService(e.target.value)}
                  displayEmpty
                  inputProps={{ 'aria-label': 'UPI Service' }}
                >
                  <MenuItem value="" disabled>Select UPI Service</MenuItem>
                  <MenuItem value="GooglePay">Google Pay</MenuItem>
                  <MenuItem value="PhonePe">PhonePe</MenuItem>
                  <MenuItem value="Paytm">Paytm</MenuItem>
                </Select>
              </FormControl>
              <TextField
                fullWidth
                margin="normal"
                placeholder="UPI ID"
                type="text"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
              />
            </div>
          )}

          {selectedPaymentMethod === "BankTransfer" && (
            <div className="payment-details">
              <TextField
                fullWidth
                margin="normal"
                placeholder="Bank Name"
                type="text"
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
              />
              <TextField
                fullWidth
                margin="normal"
                placeholder="Username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <TextField
                fullWidth
                margin="normal"
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          )}

          {error && (
            <Typography variant="body1" color="error" align="center">
              {error}
            </Typography>
          )}

          <div className="payment-submit">
            <button onClick={handleSubmit} className="payment-button-submit">Submit Payment</button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PaymentSelection;
