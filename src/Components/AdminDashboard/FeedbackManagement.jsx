import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FeedbackManagement.css';
import FeedbackCount from './FeedbackCount';

const FeedbackManagement = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [sortOrder, setSortOrder] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:8080/feedback/all');
        setFeedbacks(response.data);
      } catch (error) {
        console.error('Error fetching feedback data:', error.response?.data || error.message);
        setError('Failed to load feedback data from the backend.');
      } finally {
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, []);

  const handleSortChange = (e) => {
    const order = e.target.value;
    setSortOrder(order);

    const sortedFeedbacks = [...feedbacks].sort((a, b) => {
      return order === 'asc'
        ? new Date(a.date) - new Date(b.date)
        : new Date(b.date) - new Date(a.date);
    });

    setFeedbacks(sortedFeedbacks);
  };

  const handleStatusToggle = async (feedbackId, currentStatus) => {
    try {
      const newStatus = currentStatus === 'Read' ? 'Unread' : 'Read';
      const updatedFeedbacks = feedbacks.map(feedback =>
        feedback.feedbackId === feedbackId
          ? { ...feedback, status: newStatus }
          : feedback
      );
      setFeedbacks(updatedFeedbacks);

      await axios.put(`http://localhost:8080/feedback/updateStatus/${feedbackId}`, null, {
        params: { status: newStatus }
      });
    } catch (error) {
      console.error('Error updating feedback status:', error.response?.data || error.message);
      setError('Failed to update feedback status.');
    }
  };

  const handleDelete = async (feedbackId) => {
    try {
      const id = parseInt(feedbackId, 10);
      const response = await axios.delete(`http://localhost:8080/feedback/deletefeedback/${id}`);
      
      if (response.status === 204) {
        const updatedFeedbacks = feedbacks.filter(feedback => feedback.feedbackId !== id);
        setFeedbacks(updatedFeedbacks);
        alert('Feedback deleted successfully.');
      } else {
        console.error('Failed to delete feedback:', response.status, response.statusText);
        alert(`Failed to delete feedback: ${response.statusText}`);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'An error occurred';
      console.error('Error deleting feedback:', errorMessage);
      alert(`Failed to delete feedback: ${errorMessage}`);
    }
  };

  const totalFeedbacks = feedbacks.length;
  const readCount = feedbacks.filter(feedback => feedback.status === 'Read').length;
  const unreadCount = feedbacks.filter(feedback => feedback.status === 'Unread').length;

  return (
    <div className="feedback-management">
      <h2>Feedback Management</h2>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <FeedbackCount
        totalFeedbacks={totalFeedbacks}
        readCount={readCount}
        unreadCount={unreadCount}
      />
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
            <th>Feedback ID</th>
            <th>Student ID</th>
            <th>Student Email</th>
            <th>Staff ID</th>
            <th>Staff Email</th>
            <th>Comments/Feedback</th>
            <th>Date</th>
            <th>Status</th>
            <th>Actions</th>
            <th>Delete Data</th>
          </tr>
        </thead>
        <tbody>
          {feedbacks.map(feedback => (
            <tr key={feedback.feedbackId}>
              <td>{feedback.feedbackId}</td>
              <td>{feedback.student?.studentId || 'Unknown'}</td>
              <td>{feedback.studentEmail}</td>
              <td>{feedback.staff?.staffId || 'Unknown'}</td>
              <td>{feedback.staffEmail}</td>
              <td>{feedback.feedback}</td>
              <td>{new Date(feedback.date).toLocaleDateString() || 'Invalid Date'}</td>
              <td className='status-column'>
                {feedback.status}
              </td>
              <td className='actions-column'>
                <button 
                  onClick={() => handleStatusToggle(feedback.feedbackId, feedback.status)} 
                  className={`action-button-fb ${feedback.status === 'Read' ? 'unread' : 'read'}`}
                >
                  Mark as {feedback.status === 'Read' ? 'Unread' : 'Read'}
                </button>
              </td>
              <td className='delete-column'>
                <button 
                  onClick={() => handleDelete(feedback.feedbackId)} 
                  className='delete-button'
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FeedbackManagement;
