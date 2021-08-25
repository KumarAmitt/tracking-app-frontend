import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import AppBar from './AppBar';
import { getProducts, loadProducts } from '../../store/slicers/product';

const TrackDetails = ({ location }) => {
  const { info, date } = location;
  const title = 'Track Details';
  const dispatch = useDispatch();
  const products = useSelector(getProducts);
  const todayTotal = info ? info.map((e) => e.premium).reduce((a, b) => a + b) : 0;

  useEffect(() => {
    dispatch(loadProducts());
  }, []);

  console.log(todayTotal);
  return (
    <>
      <AppBar title={title} />
      <Link to="/track">Go Back</Link>
      <div>{date}</div>
      <hr />
      {
        info && info.map((e) => (
          <div key={e.id}>
            <div>{products.length > 0 ? products.filter((f) => f.id === e.product_id)[0].product_name : ''}</div>
            <div>{e.premium}</div>
            <div>{e.application_id}</div>
            <hr />
          </div>
        ))
      }
    </>
  );
};

TrackDetails.propTypes = {
  location: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default TrackDetails;
