import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AppBar from './AppBar';
import { getTodayDeals, loadDeals } from '../../store/slicers/deal';
import { getProducts, loadProducts } from '../../store/slicers/product';

const Track = () => {
  const title = 'Track Your Deal';
  const dispatch = useDispatch();
  // const deals = useSelector(getDeals);
  const todayDeals = useSelector(getTodayDeals);
  const products = useSelector(getProducts);

  const total = todayDeals !== undefined && todayDeals.length > 0
    ? todayDeals.map((e) => e.premium).reduce((a, b) => a + b) : 0;

  useEffect(() => {
    dispatch(loadDeals());
    dispatch(loadProducts());
  }, []);

  console.log(todayDeals);
  // console.log(deals);

  return (
    <>
      <AppBar title={title} />
      <h3>
        Today:
        {total}
      </h3>
      {
        todayDeals && todayDeals.map((e) => (
          <div key={e.id}>
            <h5>
              PRODUCT:
              {products.length > 0 ? products.filter((f) => f.id === e.product_id)[0].product_name : ''}
            </h5>
            <h5>
              PREMIUM:
              {e.premium}
            </h5>
            <h5>
              DATE:
              {e.created_at.slice(0, 10)}
            </h5>
            <h5>
              APPL_ID:
              {e.application_id}
            </h5>
            <hr />
          </div>
        ))
      }
    </>
  );
};

export default Track;
