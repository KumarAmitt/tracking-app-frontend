import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import AppBar from './AppBar';
import { getAllDeals, loadDeals } from '../../store/slicers/deal';
import { getProducts, loadProducts } from '../../store/slicers/product';

const Track = () => {
  const title = 'Track Your Deal';
  const dispatch = useDispatch();
  const deals = useSelector(getAllDeals);
  const products = useSelector(getProducts);

  useEffect(() => {
    dispatch(loadDeals());
    dispatch(loadProducts());
  }, []);

  console.log(products);
  console.log(deals);

  const handleClick = (data) => {
    console.log(data);
  };

  // products.length > 0 ? products.filter((f) => f.id === e.product_id)[0].product_name : ''

  return (
    <>
      <AppBar title={title} />
      {
        Object.entries(deals).map((d) => (
          <div key={d[0]} onClick={() => handleClick(d[1])} onKeyDown={() => handleClick(d[1])} role="button" tabIndex={0}>
            <span>
              {d[0]}
              :
            </span>
            {' '}
            <span>{d[1].map((e) => e.premium).reduce((a, b) => a + b)}</span>
            {' '}
            <span>{d[1].length}</span>
          </div>
        ))
      }

      {
        Object.entries(deals).map((d) => (
          <Link to="/track_details" key={d[0]}>Deal Details</Link>
        ))
      }

    </>
  );
};

export default Track;
