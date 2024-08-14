import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../AdminDashboard/CourseBooking.css';
import all_product from '../Assets/all_product'; 

const CourseBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [newBooking, setNewBooking] = useState({
    courseId: '',
    staffId: '',
    studentId: '',
    courseName: ''
  });
  const [formVisible, setFormVisible] = useState(false);
  const [students, setStudents] = useState([]);
  const [staff, setStaff] = useState([]);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get('http://localhost:8080/coursebooking/all');
        setBookings(response.data);
      } catch (error) {
        console.error('Error fetching course bookings:', error);
      }
    };

    fetchBookings();
  }, []);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get('http://localhost:8080/student/all');
        setStudents(response.data);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };

    fetchStudents();
  }, []);

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const response = await axios.get('http://localhost:8080/staff/all');
        setStaff(response.data);
      } catch (error) {
        console.error('Error fetching staff:', error);
      }
    };

    fetchStaff();
  }, []);

  useEffect(() => {
    console.log('All products data:', all_product); 
    setCourses(all_product);
  }, []);

  const handleCourseIdChange = (e) => {
    const selectedCourseId = e.target.value;
    console.log('Selected course ID:', selectedCourseId);
    const selectedCourse = courses.find(course => course.id === parseInt(selectedCourseId));
    setNewBooking(prev => ({
      ...prev,
      courseId: selectedCourseId,
      courseName: selectedCourse ? selectedCourse.name : ''
    }));
  };

  const handleAddBooking = async () => {
    try {
      const response = await axios.post('http://localhost:8080/coursebooking/addcoursebooking', newBooking);
      setBookings([...bookings, response.data]);
      setNewBooking({
        courseId: '',
        staffId: '',
        studentId: '',
        courseName: ''
      }); 
      setFormVisible(false); 
    } catch (error) {
      console.error('Error adding course booking:', error);
    }
  };

  const handleDeleteBooking = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/coursebooking/delete/${id}`);
      setBookings(bookings.filter(booking => booking.id !== id));
    } catch (error) {
      console.error('Error deleting course booking:', error);
    }
  };

  const bookingCount = bookings.length;

  return (
    <div className="course-booking">
      <h2>Booking List</h2>
      <br/>
      <div className="booking-count">
        <h2>Total Bookings</h2>
        <p className="count">{bookingCount}</p>
      </div>
      <button className="button-cb" onClick={() => setFormVisible(!formVisible)}>
        {formVisible ? 'Hide Booking Form' : 'Add Booking'}
      </button>
      {formVisible && (
        <div className="add-booking-form-cb">
          <h3>Add New Booking</h3>
          <label>
            Course ID:
            <select
              className="select-cb"
              value={newBooking.courseId}
              onChange={handleCourseIdChange}
            >
              <option value="">Select Course ID</option>
              {courses.map(course => (
                <option key={course.id} value={course.id}>{course.id}</option>
              ))}
            </select>
          </label>
          <label>
            Course Name:
            <input
              type="text"
              className="input-cb"
              value={newBooking.courseName}
              readOnly
            />
          </label>
          <label>
            Staff ID:
            <select
              className="select-cb"
              value={newBooking.staffId}
              onChange={(e) => setNewBooking({ ...newBooking, staffId: e.target.value })}
            >
              <option value="">Select Staff ID</option>
              {staff.map(person => (
                <option key={person.staffId} value={person.staffId}>{person.staffId}</option>
              ))}
            </select>
          </label>
          <label>
            Student ID:
            <select
              className="select-cb"
              value={newBooking.studentId}
              onChange={(e) => setNewBooking({ ...newBooking, studentId: e.target.value })}
            >
              <option value="">Select Student ID</option>
              {students.map(student => (
                <option key={student.studentId} value={student.studentId}>{student.studentId}</option>
              ))}
            </select>
          </label>
          <button className="button-cb" onClick={handleAddBooking}>Add Booking</button>
        </div>
      )}
      <table className="table-cb">
        <thead>
          <tr>
            <th>Booking ID</th>
            <th>Course ID</th>
            <th>Staff ID</th>
            <th>Student ID</th>
            <th>Course Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.length > 0 ? (
            bookings.map(booking => (
              <tr key={booking.id}>
                <td>{booking.id}</td>
                <td>{booking.courseId}</td>
                <td>{booking.staffId}</td>
                <td>{booking.studentId}</td>
                <td>{booking.courseName}</td>
                <td>
                  <button className="button-cb-del" onClick={() => handleDeleteBooking(booking.id)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="table-empty">No bookings found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CourseBooking;
