import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => (
  <>
    <Link to="/add_deal">Add Deal</Link>
    {' '}
    |
    {' '}
    <Link to="/track">Track</Link>
    {' '}
    |
    {' '}
    <Link to="/">Dashboard</Link>
    {' '}
    |
    {' '}
    <Link to="/profile">Profile</Link>
  </>
);

export default NavBar;
