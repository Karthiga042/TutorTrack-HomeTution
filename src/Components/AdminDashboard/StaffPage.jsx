import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './StaffPage.css';
import StaffCount from './StaffCount';
import StaffChart from './StaffChart'; 

const StaffPage = () => {
  const [isAdding, setIsAdding] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [newStaff, setNewStaff] = useState({
    firstName: '',
    lastName: '',
    qualification: '',
    email: '',
    contactNumber: '',
    gender: '',
    password: '',
    subject: ''
  });
  const [staff, setStaff] = useState([]);
  const [filteredStaff, setFilteredStaff] = useState([]);
  const [sortCategory, setSortCategory] = useState('');
  const [selectedStaff, setSelectedStaff] = useState([]);
  const [nextId, setNextId] = useState(1);
  const [editingStaffId, setEditingStaffId] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const fetchStaff = async () => {
    try {
      const response = await axios.get('http://localhost:8080/staff/all');
      const fetchedStaff = response.data;
      if (Array.isArray(fetchedStaff)) {
        setStaff(fetchedStaff);
        if (fetchedStaff.length > 0) {
          setNextId(Math.max(...fetchedStaff.map(member => member.staffId)) + 1);
        }
      } else {
        console.error('Unexpected data format:', fetchedStaff);
      }
    } catch (error) {
      console.error('Error fetching staff data:', error);
    }
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  useEffect(() => {
    filterStaff();
  }, [staff, sortCategory]);

  const handleAddClick = () => {
    setIsAdding(!isAdding);
    if (isUpdating) {
      setIsUpdating(false);
      setEditingStaffId(null);
      setNewStaff({
        firstName: '',
        lastName: '',
        qualification: '',
        email: '',
        contactNumber: '',
        gender: '',
        password: '',
        subject: ''
      });
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setImageFile(files[0]); 
    } else {
      setNewStaff({ ...newStaff, [name]: value });
    }
  };

  const uploadImage = async (staffId) => {
    if (imageFile) {
      const formData = new FormData();
      formData.append('image', imageFile);
      await axios.post(`http://localhost:8080/staff/${staffId}/uploadImage`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (
      !newStaff.firstName ||
      !newStaff.lastName ||
      !newStaff.email ||
      !newStaff.contactNumber ||
      !newStaff.gender ||
      !newStaff.qualification ||
      !newStaff.password ||
      !newStaff.subject
    ) {
      alert('Please fill out all fields.');
      return;
    }
  
    try {
      if (isUpdating) {
        const updateResponse = await axios.put(`http://localhost:8080/staff/updatestaff/${editingStaffId}`, { ...newStaff, staffId: editingStaffId });
        console.log('Update Response:', updateResponse.data);
        await uploadImage(editingStaffId);
      } else {
        const response = await axios.post('http://localhost:8080/staff/addstaff', { ...newStaff, staffId: nextId });
        console.log('Add Response:', response.data);
        await uploadImage(nextId);
        setNextId(nextId + 1);
      }
  
      await fetchStaff();
      setIsAdding(false);
      setIsUpdating(false);
      setEditingStaffId(null);
      setImageFile(null); 
      setNewStaff({
        firstName: '',
        lastName: '',
        qualification: '',
        email: '',
        contactNumber: '',
        gender: '',
        password: '',
        subject: ''
      });
    } catch (error) {
      console.error('Error adding/updating staff:', error);
      alert('Error adding/updating staff. Please check the console for details.');
    }
  };
  

  const handleSort = (e) => {
    setSortCategory(e.target.value);
  };

  const filterStaff = () => {
    if (sortCategory === '') {
      setFilteredStaff(staff);
    } else {
      setFilteredStaff(staff.filter(member => member.subject === sortCategory));
    }
  };

  const handleCheckboxChange = (index) => {
    setSelectedStaff(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  const handleRemove = async () => {
    if (selectedStaff.length === 0) {
      alert('Please select at least one staff member to remove.');
      return;
    }

    try {
      const staffIds = selectedStaff.map(index => staff[index].staffId);

      for (const id of staffIds) {
        await axios.delete(`http://localhost:8080/staff/deletestaff/${id}`);
      }

      const updatedStaff = staff.filter((_, index) => !selectedStaff.includes(index));
      setStaff(updatedStaff);
      setSelectedStaff([]);
    } catch (error) {
      console.error('Error removing staff:', error);
      alert('Failed to remove staff members. Please try again.');
    }
  };

  const handleUpdateClick = () => {
    if (selectedStaff.length === 1) {
      const staffToEdit = staff[selectedStaff[0]];
      setNewStaff({
        firstName: staffToEdit.firstName,
        lastName: staffToEdit.lastName,
        qualification: staffToEdit.qualification,
        email: staffToEdit.email,
        contactNumber: staffToEdit.contactNumber,
        gender: staffToEdit.gender,
        password: staffToEdit.password,
        subject: staffToEdit.subject
      });
      setEditingStaffId(staffToEdit.staffId);
      setIsUpdating(true);
      setIsAdding(true);
    } else {
      alert('Please select exactly one staff member to update.');
    }
  };

  const totalStaffCount = staff.length;
  const maleStaffCount = staff.filter(member => member.gender === 'Male').length;
  const femaleStaffCount = staff.filter(member => member.gender === 'Female').length;

  const categoryData = staff.reduce((acc, member) => {
    if (!acc[member.subject]) {
      acc[member.subject] = 0;
    }
    acc[member.subject]++;
    return acc;
  }, {});

  return (
    <div className="staff-page">
      <StaffCount
        totalCount={totalStaffCount}
        maleCount={maleStaffCount}
        femaleCount={femaleStaffCount}
      />
      <br /><br />
      <button onClick={handleAddClick}>
        {isAdding ? 'Cancel' : (isUpdating ? 'Cancel Update' : 'Add New Staff')}
      </button>
      <button onClick={handleUpdateClick} disabled={selectedStaff.length !== 1}>
        Update Staff
      </button>
      <button className='removebtn' onClick={handleRemove} disabled={selectedStaff.length === 0}>
        Remove Staff
      </button>
      {isAdding && (
        <form onSubmit={handleSubmit} className="add-form">
          <input
            type="text"
            name="firstName"
            value={newStaff.firstName}
            onChange={handleChange}
            placeholder="First Name"
            required
          />
          <input
            type="text"
            name="lastName"
            value={newStaff.lastName}
            onChange={handleChange}
            placeholder="Last Name"
            required
          />
          <input
            type="text"
            name="qualification"
            value={newStaff.qualification}
            onChange={handleChange}
            placeholder="Qualification"
            required
          />
          <input
            type="email"
            name="email"
            value={newStaff.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
          <input
            type="tel"
            name="contactNumber"
            value={newStaff.contactNumber}
            onChange={handleChange}
            placeholder="Contact Number"
            required
          />
          <select
            name="gender"
            value={newStaff.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <input
            type="password"
            name="password"
            value={newStaff.password}
            onChange={handleChange}
            placeholder="Password"
            required
          />
          <select
            name="subject"
            value={newStaff.subject}
            onChange={handleChange}
            required
          >
            <option value="">Select Subject</option>
            <option value="Mathematics">Mathematics</option>
            <option value="Computer Science">Computer Science</option>
            <option value="English">English</option>
            <option value="Economics">Economics</option>
            <option value="Biology">Biology</option>
          </select>
          <input
            type="file"
            name="image"
            onChange={handleChange}
          />
          <button type="submit">{isUpdating ? 'Update Staff' : 'Add Staff'}</button>
        </form>
      )}
      <div className="sort-controls">
        <select
          value={sortCategory}
          onChange={handleSort}
          className="sort-dropdown"
        >
          <option value="">Sort by Subject</option>
          <option value="Mathematics">Mathematics</option>
          <option value="Computer Science">Computer Science</option>
          <option value="English">English</option>
          <option value="Economics">Economics</option>
          <option value="Biology">Biology</option>
        </select>
      </div>
      <table className="staff-table">
        <thead>
          <tr>
            <th>Select</th>
            <th>Staff ID</th>
            <th>Staff Image</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Qualification</th>
            <th>Email</th>
            <th>Contact Number</th>
            <th>Gender</th>
            <th>Password</th>
            <th>Subject</th>
          </tr>
        </thead>
        <tbody>
          {filteredStaff.map((member, index) => (
            <tr key={member.staffId}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedStaff.includes(index)}
                  onChange={() => handleCheckboxChange(index)}
                />
              </td>
              <td>{member.staffId}</td>
              <td>
                {member.staffId && (
                  <img
                    src={`http://localhost:8080/staff/${member.staffId}/image`}
                    alt="Staff"
                    style={{ width: '100px', height: 'auto' }}
                  />
                )}
              </td>
              <td>{member.firstName}</td>
              <td>{member.lastName}</td>
              <td>{member.qualification}</td>
              <td>{member.email}</td>
              <td>{member.contactNumber}</td>
              <td>{member.gender}</td>
              <td>{member.password}</td>
              <td>{member.subject}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StaffPage;
