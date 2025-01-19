import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { BookingProvider } from './context/BookingContext';
import Home from './pages/Home';
import HotelPage from './pages/HotelPage';

const App = () => {
  return (
    <BookingProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hotel/:hotelId" element={<HotelPage />} />
      </Routes>
    </Router>
  </BookingProvider>
  );
};

export default App;