import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => (
  <>
    <Link to="/">Tab 1</Link>
    {' '}
    |
    {' '}
    <Link to="/">Tab 2</Link>
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
