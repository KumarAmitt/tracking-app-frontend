import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import AppBar from '../AppBar/AppBar';
import { getAllDeals, loadDeals } from '../../../store/slicers/deal';
import './style/Track.css';
import { getUserInfo, loadSession } from '../../../store/slicers/user';

const Track = () => {
  const title = 'Track Your Deal';
  const dispatch = useDispatch();

  const userInfo = useSelector(getUserInfo);
  const deals = useSelector(getAllDeals);

  useEffect(() => {
    dispatch(loadSession());
    dispatch(loadDeals());
  }, []);

  if (userInfo.logged_in === false) {
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
                  <div className="count">
                    Policy Count:
                    {' '}
                    <span>{d[1].length}</span>
                  </div>
                </div>
                <div className="track-tile-right">
                  <span>&#8377;</span>
                  <span>{d[1].map((e) => e.premium).reduce((a, b) => a + b)}</span>
                  <NavigateNextIcon />
                </div>
              </Link>
            </div>
          ))
       }
    </div>
  );
};

export default Track;
