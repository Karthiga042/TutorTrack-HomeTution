import React, { useState, useEffect } from 'react';
import './StudentPage.css';
import StudentsCount from './StudentsCount';
import StudentChart from './StudentChart'; 
import axios from 'axios';
import moment from 'moment'; 

const StudentPage = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [sortOrder, setSortOrder] = useState('ascending'); 

  const [totalCount, setTotalCount] = useState(0); 
  const [maleCount, setMaleCount] = useState(0);
  const [femaleCount, setFemaleCount] = useState(0);
  const [dailyEnrollments, setDailyEnrollments] = useState([]); 

  const fetchStudentData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/student/all');
      if (response.status === 200) {
        setStudents(response.data);
      } else {
        console.error('Failed to fetch data:', response.statusText);
        alert('Failed to fetch student data. Please try again.');
      }
    } catch (error) {
      console.error('There was an error fetching the student data:', error);
      alert('Failed to fetch student data. Please try again.');
    }
  };

  useEffect(() => {
    const sortedStudents = [...students].sort((a, b) => {
      const nameA = a.firstName || '';
      const nameB = b.firstName || '';
      return sortOrder === 'ascending' 
        ? nameA.localeCompare(nameB) 
        : nameB.localeCompare(nameA);
    });

    setFilteredStudents(sortedStudents);

    const totalCount = students.length;
    const maleCount = students.filter(student => student.gender === 'male').length;
    const femaleCount = students.filter(student => student.gender === 'female').length;
    
    setTotalCount(totalCount);
    setMaleCount(maleCount);
    setFemaleCount(femaleCount);

    const enrollments = students.reduce((acc, student) => {
      const date = moment(student.enrollmentDate).format('YYYY-MM-DD');
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {});

    setDailyEnrollments(Object.entries(enrollments).map(([date, count]) => ({ date, count })));
  }, [students, sortOrder]);

  const refreshData = async () => {
    await fetchStudentData();
  };

  useEffect(() => {
    fetchStudentData();
  }, []);

  const handleCheckboxChange = (index) => {
    setSelectedStudents((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const handleRemove = async () => {
    if (selectedStudents.length === 0) {
      alert('Please select at least one student to remove.');
      return;
    }

    try {
      const studentIds = selectedStudents.map(index => students[index].studentId);
      await axios.delete('http://localhost:8080/student/deleteall', { data: { studentIds } });

      const updatedStudents = students.filter((_, index) => !selectedStudents.includes(index));
      setStudents(updatedStudents);
      setSelectedStudents([]);
    } catch (error) {
      console.error('Error removing students:', error);
      alert('Failed to remove students. Please try again.');
    }
  };

  const handleRemoveStudent = async (index) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        const studentId = students[index].studentId;
        await axios.delete(`http://localhost:8080/student/deletestudent/${studentId}`);

        const updatedStudents = students.filter((_, i) => i !== index);
        setStudents(updatedStudents);
        setSelectedStudents(selectedStudents.filter((i) => i !== index));
      } catch (error) {
        console.error('Error removing student:', error);
        alert('Failed to remove student. Please try again.');
      }
    }
  };

  const handleSortOrderChange = (e) => {
    setSortOrder(e.target.value);
  };

  return (
    <div className="student-page">
      <div className="student-dashboard">
        <StudentsCount
          totalCount={totalCount}
          maleCount={maleCount}
          femaleCount={femaleCount}
        />
      </div>
      <div className="sort-controls">
        <select
          value={sortOrder}
          onChange={handleSortOrderChange}
          className="sort-dropdown"
        >
          <option value="ascending">Sort by First Name (Ascending)</option>
          <option value="descending">Sort by First Name (Descending)</option>
        </select>
      </div>
      <table>
        <thead>
          <tr>
            <th>Select</th>
            <th>Student ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Gender</th>
            <th>Password</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.map((student, index) => (
            <tr key={index}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedStudents.includes(index)}
                  onChange={() => handleCheckboxChange(index)}
                />
              </td>
              <td>{student.studentId}</td>
              <td>{student.firstName || 'N/A'}</td>
              <td>{student.lastName || 'N/A'}</td>
              <td>{student.email || 'N/A'}</td>
              <td>{student.contactNumber || 'N/A'}</td>
              <td>{student.gender || 'N/A'}</td>
              <td>{student.password || 'N/A'}</td>
              <td>
                <button
                  onClick={() => handleRemoveStudent(index)}
                  style={{
                    backgroundColor: 'red',
                    color: 'white',
                    padding: '20px 20px',
                    fontSize: '20px',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        onClick={handleRemove}
        style={{
          backgroundColor: 'red',
          color: 'white',
          padding: '20px 20px',
          fontSize: '20px',
          border: 'none',
          cursor: 'pointer',
          marginTop: '20px'
        }}
      >
        Remove Selected Students
      </button>
    </div>
  );
};

export default StudentPage;
