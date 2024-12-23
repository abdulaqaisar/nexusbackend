import React, { useState, useEffect } from 'react';
import logo from "../assets/logo.png";
import menu_icon from "../assets/menu-icon.png";
import '../Styles/Navbar.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [sticky, setSticky] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('');

  const toggleMenu = () => {
    setMobileMenu(!mobileMenu);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role'); 

    if (token) {
      setIsLoggedIn(true);
      setUserRole(role); 
    } else {
      setIsLoggedIn(false);
      setUserRole('');
    }
  }, []);

  const dashboardLink = isLoggedIn
    ? userRole === 'admin'
      ? '/admin-dashboard' 
      : '/student-dashboard'
    : '';

  return (
    <nav className={`container ${sticky ? "dark-nav" : ""}`}>
      <img src={logo} alt="Logo" className="logo" />
      <ul className={mobileMenu ? "" : "hide-mobile-menu"}>
        <li>
          <Link to="/">HOME</Link>
        </li>
        <li>
          <Link to="/application">APPLY NOW</Link>
        </li>
        <li>
          <a href="#program">PROGRAM</a>
        </li>
        <li>
          <a href="#about">ABOUT</a>
        </li>
        <li>
          <a href="#campus">CAMPUS</a>
        </li>

        {isLoggedIn ? (
          <li>
            <Link to={dashboardLink}>DASHBOARD</Link>
          </li>
        ) : (
          <li>
            <Link to="/login">LOGIN</Link>
          </li>
        )}

        <li>
          <a href="#contact" id="#Contact">
            <button className="btn">CONTACT US</button>
          </a>
        </li>
      </ul>
      <img
        src={menu_icon}
        className="menu-icon"
        onClick={toggleMenu}
        alt="menu"
      />
    </nav>
  );
};

export default Navbar;