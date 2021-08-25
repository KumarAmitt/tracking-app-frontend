import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import AppBar from './AppBar';

const TrackDetails = ({ location }) => {
  const title = 'Track Details';

  console.log(location.info);
  return (
    <>
      <AppBar title={title} />
      <Link to="/track">Go Back</Link>
    </>
  );
};

TrackDetails.propTypes = {
  location: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default TrackDetails;
