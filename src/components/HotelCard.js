import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/HotelCard.css';
import { FaArrowRight } from "react-icons/fa6";

const HotelCard = ({ hotel }) => {
  const minPrice = Math.min(...hotel.rooms.map(room => room.price));
  const maxPrice = Math.max(...hotel.rooms.map(room => room.price));
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate(`/hotel/${hotel.id}`);
  };

  return (
    <div className="hotel-card">
      <img src={hotel.image_url} alt={hotel.name} />
      <h3>{hotel.name}</h3>
      <p>{hotel.city}</p>
      <div className="price-button-container">
        <p className="price-range">₹ {minPrice} - {maxPrice}</p>
        <button onClick={handleSearch} className="viewButton">
          View <FaArrowRight style={{ verticalAlign: 'middle', fontSize: '12px' }} />
        </button>
      </div>
    </div>
  );
};

export default HotelCard;