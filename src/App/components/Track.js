import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import AppBar from './AppBar';
import { getAllDeals, loadDeals } from '../../store/slicers/deal';
import { getSessionInfo, loadSession } from '../../store/slicers/user_session';
import './style/Track.css';

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
    <div className="track">
      <AppBar title={title} />
      {
        Object.entries(deals).length === 0 ? <div className="not-found">No data found. Please Add deal first</div>
          : Object.entries(deals).map((d) => (
            <div key={d[0]} className="track-tile">
              <Link to={{ pathname: '/track_details', info: d[1], date: d[0] }}>
                <div className="track-tile-left">
                  <div className="date">{d[0]}</div>
                  <div className="date">
                    Policy Count:
                    {' '}
                    <span>{d[1].length}</span>
                  </div>
                </div>
                <div className="track-tile-right">
                  {d[1].map((e) => e.premium).reduce((a, b) => a + b)}
                </div>
              </Link>
            </div>
          ))
       }
    </div>
  );
};

export default Track;
