import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { getSessionInfo, loadSession } from '../../store/slicers/user_session';
import { logoutUser } from '../../store/slicers/user_logout';
import AppBar from './AppBar';

const Profile = () => {
  const dispatch = useDispatch();
  const sessionInfo = useSelector(getSessionInfo);

  useEffect(() => {
    dispatch(loadSession());
  }, []);

  const handleLogout = async () => {
    await dispatch(logoutUser());
    dispatch(loadSession());
  };

  if (!sessionInfo.logged_in) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <AppBar title="Profile" />
      <h1>{sessionInfo.user.username}</h1>
      <button type="button" onClick={handleLogout}>Sign Out</button>
    </>
  );
};

export default Profile;
