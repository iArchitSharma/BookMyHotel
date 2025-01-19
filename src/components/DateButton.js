import React, { useRef, useState } from 'react';
import '../styles/DateButton.css'; 
import { MdCalendarToday } from "react-icons/md";

const DateButton = () => {
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const checkInRef = useRef(null);
  const checkOutRef = useRef(null);

  const handleCheckInClick = () => {
    console.log('Check-in clicked'); // Debugging
    if (checkInRef.current) {
      checkInRef.current.click(); // Trigger the date input
    }
  };

  const handleCheckOutClick = () => {
    console.log('Check-out clicked'); // Debugging
    if (checkOutRef.current) {
      checkOutRef.current.click(); // Trigger the date input
    }
  };

  const handleCheckInChange = (e) => {
    setCheckInDate(e.target.value);
  };

  const handleCheckOutChange = (e) => {
    setCheckOutDate(e.target.value);
  };

  return (
    <div className="date-button-container">
      <div className="left-side" onClick={handleCheckInClick}>
        <MdCalendarToday className='icons'/><span>Check-in</span>
        {checkInDate && <div className="selected-date">{checkInDate}</div>}
        <input
          type="date"
          ref={checkInRef}
          value={checkInDate}
          onChange={handleCheckInChange}
          className="hidden-input"
        />
      </div>
      <div className="right-side" onClick={handleCheckOutClick}>
        <span>Check-out</span>
        {checkOutDate && <div className="selected-date">{checkOutDate}</div>}
        <input
          type="date"
          ref={checkOutRef}
          value={checkOutDate}
          onChange={handleCheckOutChange}
          className="hidden-input"
        />
      </div>
    </div>
  );
};

export default DateButton;