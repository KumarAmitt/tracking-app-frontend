import React from 'react';
import { Link } from 'react-router-dom';
import './style/NavBar.css';

const NavBar = () => (
  <div className="navbar">
    <Link to="/add_deal">Add Deal</Link>
    <Link to="/track">Track</Link>
    <Link to="/progress">Progress</Link>
    <Link to="/profile">Profile</Link>
  </div>
);

export default NavBar;
