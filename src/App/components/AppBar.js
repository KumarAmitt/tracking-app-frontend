import React from 'react';
import PropTypes from 'prop-types';

const AppBar = ({ title }) => (
  <>
    <h2 style={{ backgroundColor: 'blue', color: '#fff' }}>{title}</h2>
  </>
);

AppBar.propTypes = {
  title: PropTypes.string.isRequired,
};

export default AppBar;
