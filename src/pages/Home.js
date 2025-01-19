import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import HotelList from '../components/HotelList';

const Home = () => {
  const [hotels, setHotels] = useState([]);
  const [filteredHotels, setFilteredHotels] = useState([]);

  useEffect(() => {
    axios.get('https://www.gocomet.com/api/assignment/hotels?page=1&size=30')
      .then(response => {
        if (response.data.success && Array.isArray(response.data.hotels)) {
          setHotels(response.data.hotels);
          setFilteredHotels(response.data.hotels);
        } else {
          console.error('Invalid API response format:', response.data);
        }
      })
      .catch(error => {
        console.error('Error fetching hotels:', error);
      });
  }, []);

  const handleFilter = (searchTerm) => {
    const filtered = hotels.filter(hotel =>
      hotel.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredHotels(filtered);
  };

  const handleSort = (sortType) => {
    const sorted = [...filteredHotels].sort((a, b) => {
      const minPriceA = Math.min(...a.rooms.map(room => room.price));
      const minPriceB = Math.min(...b.rooms.map(room => room.price));
      return sortType === 'price_asc' ? minPriceA - minPriceB : minPriceB - minPriceA;
    });
    setFilteredHotels(sorted);
  };

  return (
    <div>
      <Header />
      <HeroSection />
      <HotelList hotels={filteredHotels} />
    </div>
  );
};

export default Home;