import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import AppBar from './AppBar';
import { getAllDeals, loadDeals } from '../../store/slicers/deal';
import { getSessionInfo, loadSession } from '../../store/slicers/user_session';

const Track = () => {
  const title = 'Track Your Deal';
  const dispatch = useDispatch();
  const sessionInfo = useSelector(getSessionInfo);
  const deals = useSelector(getAllDeals);

  useEffect(() => {
    dispatch(loadDeals());
    dispatch(loadSession());
  }, []);

  // console.log(products);
  // console.log(deals);
  // console.log('Deals: ', Object.entries(deals));

  if (!sessionInfo.logged_in) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <AppBar title={title} />
      {
        Object.entries(deals).length === 0 ? 'No data found. Please Add deal first'
          : Object.entries(deals).map((d) => (
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
