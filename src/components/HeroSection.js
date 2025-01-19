import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BookingContext } from '../context/BookingContext';
import "../styles/HeroSection.css";
import heroImage from '../assets/hero-bg.jpg';

const HeroSection = () => {
  const [hotels, setHotels] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const navigate = useNavigate();

  const {
    checkInDate,
    setCheckInDate,
    checkOutDate,
    setCheckOutDate,
    persons,
    setPersons,
  } = useContext(BookingContext);

  useEffect(() => {
    axios.get('https://www.gocomet.com/api/assignment/hotels-name')
      .then(response => {
        if (Array.isArray(response.data)) {
          setHotels(response.data);
        } else {
          console.error('Invalid API response format:', response.data);
        }
      })
      .catch(error => {
        console.error('Error fetching hotels:', error);
      });
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = hotels.filter(hotel =>
        hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hotel.city.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredHotels(filtered);
    } else {
      setFilteredHotels([]);
    }
  }, [searchTerm, hotels]);

  const handleSearch = () => {
    if (selectedHotel) {
      navigate(`/hotel/${selectedHotel.id}`);
    } else {
      alert('Please select a hotel from the list.');
    }
  };

  const handleHotelSelect = (hotel) => {
    setSelectedHotel(hotel);
    setSearchTerm(hotel.name);
    setIsInputFocused(false);
  };

  const handleInputFocus = () => {
    setIsInputFocused(true);
    setFilteredHotels(hotels.slice(0, 5));
  };

  const handleInputBlur = () => {
    setIsInputFocused(false);
  };

  const handleCheckInDateChange = (e) => {
    const selectedDate = e.target.value;
    const today = new Date().toISOString().split('T')[0]; 

    if (selectedDate < today) {
      alert('Check-in date cannot be before today.');
      setCheckInDate(today); 
    } else {
      setCheckInDate(selectedDate);
    }
  };

  return (
    <div className="HeroSection">
      <img src={heroImage} alt="Hero Background" className="HeroBackground" />
      <h1>Find the Perfect deal, always.</h1>
      <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Similique officia non corrupti pariatur aspernatur sint modi commodi cum possimus blanditiis facilis beatae repellendus, autem voluptates ratione delectus architecto quae dolore.</p>
      <div className='Heroinput'>
        <input
          type="text"
          placeholder="Type city, place, or hotel name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          style={{ marginLeft: '0px' }}
          className='input1'
        />
        <input
          type="date"
          value={checkInDate}
          onChange={handleCheckInDateChange}
          className='input2'
          placeholder="Check-in"
          min={new Date().toISOString().split('T')[0]} // Set the min attribute to today's date
        />
        <input
          type="date"
          value={checkOutDate}
          onChange={(e) => setCheckOutDate(e.target.value)}
          style={{ marginLeft: '0px' }}
          className='input3'
          placeholder="Check-out"
          min={checkInDate} 
        />
        <input
          type="number"
          value={persons}
          onChange={(e) => {
            const value = parseInt(e.target.value, 10);
            if (value < 1 || isNaN(value)) {
              setPersons(1);
            } else {
              setPersons(value);
            }
          }}
          min="1"
          className='input4'
        />
        <button onClick={handleSearch}>Search</button>

        <div className='filteredHotels'>
          {(isInputFocused || searchTerm) && filteredHotels.slice(0, 5).map(hotel => (
            <div
              key={hotel.id}
              onMouseDown={() => handleHotelSelect(hotel)}
              className='filtered-child'
            >
              {hotel.name} - {hotel.city}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;