import React, { useState, useEffect } from 'react';
import './RequestTutorMgmt.css';
import RequestTutorCount from './RequestTutorCount';
import axios from 'axios'; 

const RequestTutorManagement = () => {
  const [requests, setRequests] = useState([]);
  const [filterStatus, setFilterStatus] = useState('');
  const [selectedRequests, setSelectedRequests] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch('http://localhost:8080/requesttutor/all');
        if (!response.ok) {
          throw new Error('Failed to fetch requests');
        }
        const data = await response.json();
        setRequests(data || []);
      } catch (error) {
        console.error('Error fetching requests:', error);
      }
    };

    fetchRequests();
  }, []);

  const handleFilterChange = (e) => {
    setFilterStatus(e.target.value);
  };

  const handleSelectChange = (requestId, isChecked) => {
    setSelectedRequests((prev) =>
      isChecked ? [...prev, requestId] : prev.filter(id => id !== requestId)
    );
  };

  const handleSelectAllChange = (e) => {
    setSelectedRequests(e.target.checked ? (requests || []).map(req => req.requestId) : []);
    setSelectAll(e.target.checked);
  };

  const handleRemoveSelected = async () => {
    try {
      await fetch('http://localhost:8080/requesttutor/deleteall', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(selectedRequests),
      });
      setRequests(requests.filter(req => !selectedRequests.includes(req.requestId)));
      setSelectedRequests([]);
      setSelectAll(false);
    } catch (error) {
      console.error('Error removing selected requests:', error);
    }
  };

  const handleAction = async (requestId, action) => {
    try {
      if (action === 'delete') {
        await fetch(`http://localhost:8080/requesttutor/deleterequesttutor/${requestId}`, {
          method: 'DELETE',
        });
        setRequests(requests.filter(req => req.requestId !== requestId));
      } else {
        const status = action === 'confirm' ? 'confirmed' : 'declined';
        const response = await fetch(`http://localhost:8080/requesttutor/updateStatus/${requestId}?status=${status}`, {
          method: 'PUT',
        });

        if (response.ok) {
          setRequests(requests.map(req => req.requestId === requestId ? { ...req, status } : req));

          if (status === 'confirmed') {
            const requestDetails = requests.find(req => req.requestId === requestId);
            
            const newBooking = {
              courseId: requestDetails.preferredSubjectId,
              staffId: requestDetails.staffId,
              studentId: requestDetails.studentId,
              courseName: requestDetails.preferredSubject,
            };

            await axios.post('http://localhost:8080/coursebooking/addcoursebooking', newBooking);
          }
        } else {
          console.error('Failed to update status');
        }
      }
    } catch (error) {
      console.error('Error handling action:', error);
    }
  };

  const filteredRequests = (requests || []).filter(request => 
    filterStatus === '' || request.status.toLowerCase() === filterStatus.toLowerCase()
  );

  const countStatus = (status) => (requests || []).filter(req => req.status.toLowerCase() === status.toLowerCase()).length;

  const renderActionButtons = (status, requestId) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return (
          <>
            <button onClick={() => handleAction(requestId, 'confirm')} className='action-button-request confirm-button-request'>
              Accept
            </button>
            <button onClick={() => handleAction(requestId, 'decline')} className='action-button-request decline-button-request'>
              Decline
            </button>
          </>
        );
      case 'declined':
        return (
          <button onClick={() => handleAction(requestId, 'confirm')} className='action-button-request confirm-button-request'>
            Accept
          </button>
        );
      case 'confirmed':
        return (
          <button onClick={() => handleAction(requestId, 'decline')} className='action-button-request decline-button-request'>
            Decline
          </button>
        );
      default:
        return null;
    }
  };

  return (
    <div className="request-tutor-management">
      <h2>Request Tutor Management</h2>
      <RequestTutorCount
        all={(requests || []).length}
        confirmed={countStatus('confirmed')}
        pending={countStatus('pending')}
        declined={countStatus('declined')}
      />
      <div className="filter-controls-request">
        <select value={filterStatus} onChange={handleFilterChange} className="sort-dropdown-request">
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="declined">Declined</option>
        </select>
      </div>
      <table className="data-table-request">
        <thead>
          <tr>
            <th>
              <input type="checkbox" checked={selectAll} onChange={handleSelectAllChange} />
            </th>
            <th>Request ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Contact Number</th>
            <th>Gender</th>
            <th>Preferred Subject</th>
            <th>Preferred Place</th>
            <th>City</th>
            <th>Locality</th>
            <th>Address</th>
            <th>Contact Via</th>
            <th>Actions</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {(filteredRequests || []).length > 0 ? (
            filteredRequests.map(request => (
              <tr key={request.requestId}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedRequests.includes(request.requestId)}
                    onChange={(e) => handleSelectChange(request.requestId, e.target.checked)}
                  />
                </td>
                <td>{request.requestId}</td>
                <td>{request.firstName}</td>
                <td>{request.lastName}</td>
                <td>{request.email}</td>
                <td>{request.contactNumber}</td>
                <td>{request.gender}</td>
                <td>{request.preferredSubject}</td>
                <td>{request.preferredPlace}</td>
                <td>{request.city}</td>
                <td>{request.locality}</td>
                <td>{request.address}</td>
                <td>{request.contactVia}</td>
                <td>{renderActionButtons(request.status, request.requestId)}</td>
                <td>
                  <button onClick={() => handleAction(request.requestId, 'delete')} className='delete-button-request'>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="15">No requests found</td>
            </tr>
          )}
        </tbody>
      </table>
      {selectedRequests.length > 0 && (
        <button onClick={handleRemoveSelected} className="remove-selected-button-request">
          Remove Selected
        </button>
      )}
    </div>
  );
};

export default RequestTutorManagement;
