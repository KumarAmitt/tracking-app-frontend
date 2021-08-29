import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import AppBar from './AppBar';
import { getProducts, loadProducts } from '../../store/slicers/product';
import { getSessionInfo, loadSession } from '../../store/slicers/userSession';
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
        <div className="details-items">
          {
            info && info.map((e) => (
              <div key={e.id} className="details-item">
                <div className="ins-type">{products.length > 0 ? products.filter((f) => f.id === e.product_id)[0].product_name : ''}</div>
                <div className="premium">
                  <span>&#8377;</span>
                  {' '}
                  {e.premium}
                </div>
                <div className="appl-id">{e.application_id}</div>
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
