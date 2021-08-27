import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import AppBar from './AppBar';
import { getProducts, loadProducts } from '../../store/slicers/product';
import { getSessionInfo, loadSession } from '../../store/slicers/user_session';
import './style/TrackDetails.css';
import Stats from './Stats';

const TrackDetails = ({ location }) => {
  const { info, date } = location;
  const title = 'Track Details';
  const dispatch = useDispatch();
  const sessionInfo = useSelector(getSessionInfo);
  const products = useSelector(getProducts);
  const todayTotal = info ? info.map((e) => e.premium).reduce((a, b) => a + b) : 0;

  useEffect(() => {
    dispatch(loadProducts());
    dispatch(loadSession());
  }, []);

  // console.log(todayTotal);

  if (!sessionInfo.logged_in) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <AppBar title={title} link="/track" />
      <div className="details">
        <div className="details-header">
          <div className="date">{date}</div>
          <Stats today={todayTotal || 0} />
        </div>
        <hr />
        <div className="details-header">
          {
            info && info.map((e) => (
              <div key={e.id}>
                <div>{products.length > 0 ? products.filter((f) => f.id === e.product_id)[0].product_name : ''}</div>
                <div>{e.premium}</div>
                <div>{e.application_id}</div>
              </div>
            ))
          }
        </div>
      </div>
    </>
  );
};

TrackDetails.propTypes = {
  location: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default TrackDetails;
