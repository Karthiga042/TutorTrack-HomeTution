import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from 'axios';
import './StaffDetail.css'; 
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";

const timeSlots = [
  "9:00 AM - 10:00 AM",
  "10:00 AM - 11:00 AM",
  "11:00 AM - 12:00 PM",
  "1:00 PM - 2:00 PM",
  "2:00 PM - 3:00 PM",
  "3:00 PM - 4:00 PM",
];

const StaffDetail = () => {
  const { id } = useParams();
  const [staff, setStaff] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const response = await axios.get('http://localhost:8080/staff/all');
        const staffData = response.data;

        // Find the staff member with the matching ID
        const staffMember = staffData.find(staff => staff.staffId === parseInt(id));

        if (staffMember) {
          setStaff(staffMember);
        } else {
          setError('Staff member not found.');
        }
      } catch (error) {
        console.error('Error fetching staff data:', error);
        setError('Failed to load staff data.');
      } finally {
        setLoading(false);
      }
    };

    fetchStaff();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  if (!staff) return <div>Staff member not found.</div>;

  return (
    <div>
      <Navbar />
      <div className="staff-detail-container">
        <div className="staff-detail">
          <img src={`http://localhost:8080/staff/${staff.staffId}/image`} alt={staff.name} className="staff-detail-image" />
          <div className="staff-detail-info">
            <h1>{staff.firstName} {staff.lastName}</h1>
            <p><strong>Qualification:</strong> {staff.qualification}</p>
            <p><strong>Subject:</strong> {staff.subject}</p>
            <p><strong>Email:</strong> {staff.email}</p>
            {/* <p><strong>Contact Number:</strong> {staff.contactNumber}</p> */}
            <p><strong>Gender:</strong> {staff.gender}</p>
            <p><strong>Feedback:</strong> "{staff.feedback || 'No feedback found for this staff member'}"</p>

            <div className="date-slot-selector">
              <label htmlFor="date">Select a Date:</label>
              <input
                type="date"
                id="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </div>

            <div className="time-slot-selector">
              <label htmlFor="time-slot">Select a Time Slot:</label>
              <select
                id="time-slot"
                value={selectedTimeSlot}
                onChange={(e) => setSelectedTimeSlot(e.target.value)}
              >
                <option value="" disabled>Select a time slot</option>
                {timeSlots.map((slot, index) => (
                  <option key={index} value={slot}>{slot}</option>
                ))}
              </select>
            </div>

            <Link 
              to={selectedDate && selectedTimeSlot ? "/requestatutor" : "#"} 
              className={`confirm-selection-button ${!(selectedDate && selectedTimeSlot) ? "disabled" : ""}`}
            >
              Confirm Selection
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default StaffDetail;
