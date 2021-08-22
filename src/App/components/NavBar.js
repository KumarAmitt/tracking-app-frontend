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
    <Link to="/">Tab 3</Link>
    {' '}
    |
    {' '}
    <Link to="/">Tab 4</Link>
  </>
);

export default NavBar;
