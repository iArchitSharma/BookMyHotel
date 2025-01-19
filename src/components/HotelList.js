import React, { useState } from 'react';
import HotelCard from './HotelCard';
import "../styles/HotelList.css";

const HotelList = ({ hotels }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 6; 

  // Calculate the total number of pages
  const totalPages = Math.ceil(hotels.length / cardsPerPage);

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentHotels = hotels.slice(indexOfFirstCard, indexOfLastCard);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <h3 className="explore-hotels-heading">Explore Hotels</h3>
      <div className="hotel-list-container">
        <div className="hotel-list">
          {currentHotels.map(hotel => (
            <HotelCard key={hotel.id} hotel={hotel} />
          ))}
        </div>

        <div className="pagination">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span>{`Page ${currentPage} of ${totalPages}`}</span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default HotelList;