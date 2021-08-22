import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkLoginStatus, getSessionInfo } from '../../store/slicers/user_session';

const Dashboard = () => {
  const dispatch = useDispatch();
  const sessionInfo = useSelector(getSessionInfo);

  useEffect(() => {
    dispatch(checkLoginStatus());
  });

  console.log(sessionInfo);

  return (
    <>
      <h1>Dashboard</h1>
    </>
  );
};

export default Dashboard;
