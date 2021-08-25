import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import AppBar from './AppBar';
import { getAllDeals, loadDeals } from '../../store/slicers/deal';

const Track = () => {
  const title = 'Track Your Deal';
  const dispatch = useDispatch();
  const deals = useSelector(getAllDeals);

  useEffect(() => {
    dispatch(loadDeals());
  }, []);

  // console.log(products);
  // console.log(deals);

  return (
    <>
      <AppBar title={title} />
      {
        Object.entries(deals).map((d) => (
          <Link to={{ pathname: '/track_details', info: d[1], date: d[0] }} key={d[0]}>
            <div>
              <span>
                {d[0]}
                :
              </span>
              {' '}
              <span>{d[1].map((e) => e.premium).reduce((a, b) => a + b)}</span>
              {' '}
              <span>{d[1].length}</span>
            </div>
          </Link>
        ))
      }

    </>
  );
};

export default Track;
