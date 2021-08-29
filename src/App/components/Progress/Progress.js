import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import AppBar from '../AppBar/AppBar';
import { getProgressReport, getTotalPremium, loadDeals } from '../../../store/slicers/deal';
import { getSessionInfo, loadSession } from '../../../store/slicers/userSession';
import ProgressCircle from '../utility/ProgressCircle';
import { TARGET } from '../../../constants';
import './style/Progress.css';

const Progress = () => {
  const title = 'Progress Report';
  const dispatch = useDispatch();
  const sessionInfo = useSelector(getSessionInfo);
  const totalPremium = useSelector(getTotalPremium);
  const progressReport = useSelector(getProgressReport);
  const progressPercent = (totalPremium / TARGET) * 100;

  useEffect(() => {
    dispatch(loadDeals());
    dispatch(loadSession());
  }, []);

  if (!sessionInfo.logged_in) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <AppBar title={title} />
      <div className="progress-stats">
        <div>
          <ProgressCircle value={progressPercent} color="primary" />
          <div className="progress-stats-label">Achieved</div>
        </div>
        <div>
          <ProgressCircle value={100 - progressPercent} color={progressPercent >= 100 ? 'primary' : 'secondary'} />
          <div className="progress-stats-label">Lag</div>
        </div>
      </div>
      <div className="progress-items">
        {
          Object.entries(progressReport).map((p) => (
            <div key={p[0]} className="progress-item">
              <div className="ins-type">{p[0]}</div>
              <div className="ins-premium">
                &#8377;
                {' '}
                {p[1].map((e) => e.premium).reduce((a, b) => a + b)}
              </div>
              <div className="ins-count">
                Quantity:
                {' '}
                <span>{p[1].length}</span>
              </div>
            </div>
          ))
        }
      </div>
    </>
  );
};

export default Progress;
