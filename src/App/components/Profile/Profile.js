import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import AppBar from '../AppBar/AppBar';
import './style/Profile.css';
import { getUserInfo, loginUser, logoutUser } from '../../../store/slicers/user';

const Profile = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector(getUserInfo);

  useEffect(() => {
    dispatch(loginUser());
  }, []);

  if (!userInfo.logged_in) {
    return <Redirect to="/" />;
  }

  const handleLogout = async () => {
    await dispatch(logoutUser());
  };

  return (
    <>
      <AppBar title="Profile" />
      <div className="profile-top">
        <h2>{userInfo.username}</h2>
      </div>
      <button type="button" onClick={handleLogout} className="logout-button">
        <ExitToAppOutlinedIcon />
        <div>Sign Out</div>
      </button>
    </>
  );
};

export default Profile;
