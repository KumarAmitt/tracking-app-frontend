import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const AppBar = ({ title, link }) => {
  let linkText = '';
  switch (link) {
    case '/add_deal':
      linkText = 'ADD';
      break;
    default:
      linkText = 'HOME';
  }

  return (
    <>
      <div style={{ backgroundColor: 'blue', color: '#fff' }}>
        <Link to={link}>{linkText}</Link>
        <h2>{title}</h2>
      </div>
    </>
  );
};

AppBar.propTypes = {
  title: PropTypes.string.isRequired,
  link: PropTypes.string,
};

AppBar.defaultProps = {
  link: '/add_deal',
};

export default AppBar;
