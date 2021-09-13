import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './style/AppBar.css';
import ArrowBackIosOutlinedIcon from '@material-ui/icons/ArrowBackIosOutlined';

const AppBar = ({ title, link }) => (
  <>
    <div className="appbar">
      <Link to={link}>
        <ArrowBackIosOutlinedIcon />
      </Link>
      <div className="title">{title}</div>
    </div>
  </>
);

AppBar.propTypes = {
  title: PropTypes.string.isRequired,
  link: PropTypes.string,
};

AppBar.defaultProps = {
  link: '/add_deal',
};

export default AppBar;
