import React, { useState, useEffect } from 'react';
import './BecomeTutorMgmt.css'; 
import BecomeTutorCount from './BecomeTutorCount';

const BecomeTutorManagement = () => {
  const [tutors, setTutors] = useState([]);
  const [filterStatus, setFilterStatus] = useState('');
  const [selectedTutors, setSelectedTutors] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    fetchTutors();
  }, []);

  const fetchTutors = async () => {
    try {
      const response = await fetch('http://localhost:8080/becometutor/all');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setTutors(data);
    } catch (error) {
      console.error('Error fetching tutors:', error);
    }
  };

  const handleFilterChange = (e) => {
    setFilterStatus(e.target.value);
  };

  const handleSelectChange = (staffReq_id, isChecked) => {
    if (isChecked) {
      setSelectedTutors([...selectedTutors, staffReq_id]);
    } else {
      setSelectedTutors(selectedTutors.filter(id => id !== staffReq_id));
    }
  };

  const handleSelectAllChange = (e) => {
    if (e.target.checked) {
      setSelectedTutors(tutors.map(tutor => tutor.staffReqId));
      setSelectAll(true);
    } else {
      setSelectedTutors([]);
      setSelectAll(false);
    }
  };

  const handleRemoveSelected = async () => {
    try {
      const response = await fetch('http://localhost:8080/becometutor/deleteall', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(selectedTutors),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      setTutors(tutors.filter(tutor => !selectedTutors.includes(tutor.staffReqId)));
      setSelectedTutors([]);
      setSelectAll(false);
    } catch (error) {
      console.error('Error removing selected tutors:', error);
    }
  };

  const filteredTutors = tutors.filter(tutor => {
    if (filterStatus === '') return true;
    return tutor.status.toLowerCase() === filterStatus.toLowerCase();
  });

  const handleAction = async (staffReq_id, action) => {
    try {
      if (action === 'delete') {
        await fetch(`http://localhost:8080/becometutor/deletebecometutor/${staffReq_id}`, {
          method: 'DELETE',
        });
        setTutors(tutors.filter(tutor => tutor.staffReqId !== staffReq_id));
      } else {
        const newStatus = action === 'confirm' ? 'Confirmed' : 'Declined';
        const response = await fetch(`http://localhost:8080/becometutor/updateStatus/${staffReq_id}?status=${newStatus}`, {
          method: 'PUT',
        });

        if (response.ok) {
          setTutors(tutors.map(tutor => {
            if (tutor.staffReqId === staffReq_id) {
              return { ...tutor, status: newStatus };
            }
            return tutor;
          }));
        } else {
          console.error('Failed to update status');
        }
      }
    } catch (error) {
      console.error('Error handling action:', error);
    }
  };

  const renderActionButtons = (status, staffReq_id) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return (
          <>
            <button 
              onClick={() => handleAction(staffReq_id, 'confirm')} 
              className='action-button-become confirm-button-tut'
            >
              Accept
            </button>
            <button 
              onClick={() => handleAction(staffReq_id, 'decline')} 
              className='action-button-become decline-button-tut'
            >
              Decline
            </button>
          </>
        );
      case 'declined':
        return (
          <button 
            onClick={() => handleAction(staffReq_id, 'confirm')} 
            className='action-button-become confirm-button-tut'
          >
            Accept
          </button>
        );
      case 'confirmed':
        return (
          <button 
            onClick={() => handleAction(staffReq_id, 'decline')} 
            className='action-button-become decline-button-tut'
          >
            Decline
          </button>
        );
      default:
        console.warn('Unhandled status:', status);
        return null;
    }
  };

  const countStatus = (status) => {
    return tutors.filter(tutor => tutor.status.toLowerCase() === status.toLowerCase()).length;
  };

  return (
    <div className="become-tutor-management">
      <h2>Become Tutor Management</h2>
      <BecomeTutorCount
        all={tutors.length}
        confirmed={countStatus('confirmed')}
        pending={countStatus('pending')}
        declined={countStatus('declined')}
      /><br/><br/>
      <div className="filter-controls-become">
        <select
          value={filterStatus}
          onChange={handleFilterChange}
          className="sort-dropdown-become"
        >
          <option value="">All Status</option>
          <option value="pending">Pending Status</option>
          <option value="confirmed">Confirmed Status</option>
          <option value="declined">Declined Status</option>
        </select>
      </div>
      <table className="data-table-become">
        <thead>
          <tr>
            <th>
              <input 
                type="checkbox" 
                checked={selectAll}
                onChange={handleSelectAllChange} 
              />
            </th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Location</th>
            <th>Email</th>
            <th>Gender</th>
            <th>Qualification</th>
            <th>Subject</th>
            <th>Mobile Number</th>
            <th>Actions</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {filteredTutors.length > 0 ? (
            filteredTutors.map((tutor) => (
              <tr key={tutor.staffReqId}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedTutors.includes(tutor.staffReqId)}
                    onChange={(e) => handleSelectChange(tutor.staffReqId, e.target.checked)}
                  />
                </td>
                <td>{tutor.firstName}</td>
                <td>{tutor.lastName}</td>
                <td>{tutor.location}</td>
                <td>{tutor.email}</td>
                <td>{tutor.gender}</td>
                <td>{tutor.qualification}</td>
                <td>{tutor.subject}</td>
                <td>{tutor.contactNumber}</td>
                <td className="actions-column">
                  {renderActionButtons(tutor.status, tutor.staffReqId)}
                </td>
                <td className="delete-column">
                  <button 
                    onClick={() => handleAction(tutor.staffReqId, 'delete')} 
                    className='delete-button-become'
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="11">No tutors available</td>
            </tr>
          )}
        </tbody>
      </table>
      <br/><br/>
      <div className="actions-container">
      <button 
        onClick={handleRemoveSelected} 
        className='remove-selected-button-become'
        disabled={selectedTutors.length === 0}
      >
        Remove Selected Requests
      </button>
      </div>
    </div>
  );
};

export default BecomeTutorManagement;
