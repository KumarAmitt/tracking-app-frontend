import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const AppBar = ({ title }) => (
  <>
    <div style={{ backgroundColor: 'blue', color: '#fff' }}>
      <Link to="/track">Home</Link>
      <h2>{title}</h2>
    </div>
  </>
);

AppBar.propTypes = {
  title: PropTypes.string.isRequired,
};

export default AppBar;
