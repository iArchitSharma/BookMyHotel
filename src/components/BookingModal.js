import React, { useState, useEffect } from 'react';
import "../styles/BookingModal.css";
import { MdPeopleAlt } from "react-icons/md";
import { LuCalendarArrowDown } from "react-icons/lu";
import { LuCalendarArrowUp } from "react-icons/lu";

const BookingModal = ({ isOpen, onClose, hotelId, hotelName, roomName, checkInDate, checkOutDate, persons, roomImage }) => {
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [guests, setGuests] = useState([]);
  const [currentGuestIndex, setCurrentGuestIndex] = useState(0); // Track the current guest being displayed

  // Initialize guests based on the `persons` prop
  useEffect(() => {
    if (persons > 0) {
      const initialGuests = Array.from({ length: persons }, () => ({
        name: '',
        age: '',
        gender: '',
      }));
      setGuests(initialGuests);
    }
  }, [persons]);

  const handleBook = () => {
    // Simulate booking success
    setBookingSuccess(true);
    setTimeout(() => {
      onClose();
    }, 2000);
  };

  const addGuest = () => {
    setGuests([...guests, { name: '', age: '', gender: '' }]);
    setCurrentGuestIndex(guests.length); // Move to the newly added guest
  };

  const handleGuestChange = (field, value) => {
    const updatedGuests = [...guests];
    updatedGuests[currentGuestIndex][field] = value;
    setGuests(updatedGuests);
  };

  const goToNextGuest = () => {
    if (currentGuestIndex < guests.length - 1) {
      setCurrentGuestIndex(currentGuestIndex + 1);
    }
  };

  const goToPreviousGuest = () => {
    if (currentGuestIndex > 0) {
      setCurrentGuestIndex(currentGuestIndex - 1);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="modal-backdrop" onClick={onClose}></div>
      <div className="booking-modal">
        <div className="left-section">
          <h2>
            <span className="hotel-name">{hotelName} {' > '}</span>
            <span className="room-type">{roomName}</span>
          </h2>
          {roomImage && <img src={roomImage} alt="Room" className="room-image" />}
          <div className="amenities">
            <div className="amenity">Free Wi-Fi</div>
            <div className="amenity">TV</div>
            <div className="amenity">Jacuzzi</div>
            <div className="amenity">Balcony</div>
          </div>
          <div className="person-count">
            <MdPeopleAlt style={{ fontSize: '20px', color: '#878787', marginRight: '5px'}}/> Person: {guests.length} 
          </div>
          <div className="booking-details">
            <p><LuCalendarArrowUp style={{ fontSize: '20px', color: '#878787', marginRight: '5px'}}/>Check-in: {checkInDate}</p>
            <p><LuCalendarArrowDown style={{ fontSize: '20px', color: '#878787', marginRight: '5px'}}/>Check-out: {checkOutDate}</p>
          </div>
        </div>
        <div className="right-section">
          <div className="guest-info">
            <h3>Person {currentGuestIndex + 1}</h3>
            <input
              type="text"
              placeholder="Name"
              value={guests[currentGuestIndex].name}
              onChange={(e) => handleGuestChange('name', e.target.value)}
            />
            <input
              type="text"
              placeholder="Age"
              value={guests[currentGuestIndex].age}
              onChange={(e) => handleGuestChange('age', e.target.value)}
            />
            <div className="gender-selection">
              <label>
                <input
                  type="radio"
                  name={`gender-${currentGuestIndex}`}
                  value="Male"
                  checked={guests[currentGuestIndex].gender === 'Male'}
                  onChange={(e) => handleGuestChange('gender', e.target.value)}
                />
                Male
              </label>
              <label>
                <input
                  type="radio"
                  name={`gender-${currentGuestIndex}`}
                  value="Female"
                  checked={guests[currentGuestIndex].gender === 'Female'}
                  onChange={(e) => handleGuestChange('gender', e.target.value)}
                />
                Female
              </label>
            </div>
            <div className="add-person-container">
              <button onClick={addGuest} className="add-person">+ ADD PERSON</button>
            </div>
            <div className="guest-navigation">
              <button
                onClick={goToPreviousGuest}
                disabled={currentGuestIndex === 0}
              >
                Previous
              </button>
              <button
                onClick={goToNextGuest}
                disabled={currentGuestIndex === guests.length - 1}
              >
                Next
              </button>
            </div>
          </div>
          <button onClick={handleBook} className="book-button">Book</button>
          {bookingSuccess && <p className="success-message">Booking successful!</p>}
        </div>
      </div>
    </>
  );
};

export default BookingModal;