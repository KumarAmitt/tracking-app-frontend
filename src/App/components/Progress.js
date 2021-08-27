import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import AppBar from './AppBar';
import { getProgressReport, getTotalPremium, loadDeals } from '../../store/slicers/deal';
import { getSessionInfo, loadSession } from '../../store/slicers/user_session';
import ProgressCircle from './ProgressCircle';
import { TARGET } from '../../constants';

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

  // console.log('Total: ', totalPremium);
  // console.log('Progress: ', progressReport);

  // Object.entries(progressReport).forEach((p) => {
  //   console.log(p[0], p[1].map((e) => e.premium).reduce((a, b) => a + b));
  // });

  if (!sessionInfo.logged_in) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <AppBar title={title} />
      <div className="progress-stats">
        <div>
          <ProgressCircle value={progressPercent} />
          <div>Achieved</div>
        </div>
        <div>
          <ProgressCircle value={100 - progressPercent} />
          <div>Lag</div>
        </div>
      </div>
      <hr />
      <div>
        {
          Object.entries(progressReport).map((p) => (
            <div key={p[0]}>
              <div>{p[0]}</div>
              <div>{p[1].map((e) => e.premium).reduce((a, b) => a + b)}</div>
            </div>
          ))
        }
      </div>
    </>
  );
};

export default Progress;
