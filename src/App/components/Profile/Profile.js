import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import { getSessionInfo, loadSession } from '../../../store/slicers/userSession';
import { logoutUser } from '../../../store/slicers/userLogout';
import AppBar from '../AppBar/AppBar';
import './style/Profile.css';

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
      <div className="profile-top">
        <h2>{sessionInfo.user.username}</h2>
      </div>
      <button type="button" onClick={handleLogout} className="logout-button">
        <ExitToAppOutlinedIcon />
        <div>Sign Out</div>
      </button>
    </>
  );
};

export default Profile;
