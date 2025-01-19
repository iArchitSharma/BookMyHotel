import React, { useState, useEffect, useContext } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { BookingContext } from "../context/BookingContext"; 
import axios from "axios";
import Header from "../components/Header";
import BookingModal from "../components/BookingModal";
import "../styles/HotelPage.css";
import { FaStar } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { FaArrowRight } from "react-icons/fa6";
import { MdPeopleAlt } from "react-icons/md";
import Popover from "../components/Popover";

const HotelPage = () => {
  const { hotelId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [hotel, setHotel] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [popoverVisible, setPopoverVisible] = useState(null);
  const [popoverPosition, setPopoverPosition] = useState({ top: 0, left: 0 });
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [selectedRoomImage, setSelectedRoomImage] = useState("");
  const [selectedRoomName, setSelectedRoomName] = useState("");

  // BookingContext to access shared state
  const {
    checkInDate,
    setCheckInDate,
    checkOutDate,
    setCheckOutDate,
    persons,
    setPersons,
  } = useContext(BookingContext);

  useEffect(() => {
    axios
      .get(`https://www.gocomet.com/api/assignment/hotels/${hotelId}`)
      .then((response) => {
        if (response.data.success) {
          setHotel(response.data.hotel);
        } else {
          console.error("Invalid API response:", response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching hotel details:", error);
      });

    // Set initial state from location.state (if available)
    if (location.state) {
      setCheckInDate(location.state.checkInDate);
      setCheckOutDate(location.state.checkOutDate);
      setPersons(location.state.persons);
    }
  }, [hotelId, location.state, setCheckInDate, setCheckOutDate, setPersons]);

  const handleBookNow = (roomImageUrl, roomName) => {
    setSelectedRoomImage(roomImageUrl);
    setSelectedRoomName(roomName);
    setIsModalOpen(true);
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleMouseEnter = (roomId, event) => {
    const buttonRect = event.target.getBoundingClientRect();
    setPopoverPosition({
      top: buttonRect.bottom + window.scrollY + 5,
      left: buttonRect.left + window.scrollX,
    });
    setPopoverVisible(roomId);
  };

  const handleMouseLeave = () => {
    setPopoverVisible(null);
  };

  const toggleDescription = () => {
    setIsDescriptionExpanded(!isDescriptionExpanded);
  };

  return (
    <div>
      <Header />
      {hotel ? (
        <div>
          <div className="image-container">
            <img src={hotel.image_url} alt={hotel.name} className="hotelImage" />
            <div className="overlay"></div>
            <a href="#" className="back-link" onClick={handleBack}>
              <IoArrowBackCircleSharp />
            </a>
            <div className="content">
              <h1>{hotel.name}</h1>
              <div className="details">
                <p className="location">
                  <FaLocationDot /> {hotel.city}
                </p>
                <p className="rating">
                  <FaStar /> 4.6
                </p>
              </div>
            </div>
          </div>

          <div className="room-cards-container">
            {hotel.rooms.map((room) => (
              <div key={room.id} className="room-card">
                <img src={room.image_urls[0]} alt={room.name} />
                <div className="room-header">
                  <h3>{room.name}</h3>
                  <div className="room-occupancy">
                    <MdPeopleAlt style={{ fontSize: '22px', color: '#878787', verticalAlign: 'middle' }} />
                    <span style={{ fontSize: '16px', fontWeight: '400', marginLeft: '8px' }}>{persons}</span>
                  </div>
                </div>
                <p className="room-price">₹{room.price} / <span style={{ fontSize: '14px', fontWeight: '400' }}>night</span></p>
                <div className="room-buttons">
                  <button
                    className="room-facilities"
                    onMouseEnter={(e) => handleMouseEnter(room.id, e)}
                    onMouseLeave={handleMouseLeave}
                  >
                    View facilities
                  </button>
                  <button
                    onClick={() => handleBookNow(room.image_urls[0], room.name)} 
                    className="room-booknow"
                  >
                    Book Now <FaArrowRight style={{ verticalAlign: 'middle', fontSize: '12px' }} />
                  </button>
                </div>
                {popoverVisible === room.id && (
                  <Popover
                    content={<p className="room-amenities">{room.amenities.join(", ")}</p>}
                    position={popoverPosition}
                  />
                )}
              </div>
            ))}
          </div>

          <BookingModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            hotelId={hotelId}
            hotelName={hotel.name}
            roomName={selectedRoomName}
            checkInDate={checkInDate}
            checkOutDate={checkOutDate}
            persons={persons}
            roomImage={selectedRoomImage}
          />

          <div className="hotel-description">
            <h3>About {hotel.name}</h3>
            <p className={`description-text ${isDescriptionExpanded ? 'expanded' : 'truncated'}`}>
              {hotel.description}
            </p>
            <button onClick={toggleDescription} className="see-more-button">
              {isDescriptionExpanded ? 'See Less' : 'See More'}
            </button>
            <div className="description-highlights">
              <div className="highlight">
                <FaLocationDot className="highlight-icon" />
                <span>Prime location in the heart of {hotel.city}</span>
              </div>
              <div className="highlight">
                <FaStar className="highlight-icon" />
                <span>Rated 4.6 by our guests</span>
              </div>
              <div className="highlight">
                <MdPeopleAlt className="highlight-icon" />
                <span>Perfect for families and couples</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading hotel details...</p>
      )}
    </div>
  );
};

export default HotelPage;