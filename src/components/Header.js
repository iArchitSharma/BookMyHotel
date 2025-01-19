import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";
import "../styles/Header.css";

const Header = () => {
  return (
    <header>
      <nav>
        <ul className="left-nav">
          <li>
            <Link to="/">
              <img src={logo} alt="Logo" />
            </Link>
          </li>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/hotels">Hotels</Link>
          </li>
          <li>
            <Link to="/places">Places</Link>
          </li>
        </ul>
        <ul className="right-nav">
          <li>
            <Link to="/signin">Sign in</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;