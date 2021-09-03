import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';
import TrendingUpOutlinedIcon from '@material-ui/icons/TrendingUpOutlined';
import TrackChangesOutlinedIcon from '@material-ui/icons/TrackChangesOutlined';
import PersonOutlinedIcon from '@material-ui/icons/PersonOutlined';
import './style/NavBar.css';
import { useDispatch, useSelector } from 'react-redux';
import { getUserInfo, loadSession } from '../../../store/slicers/user';

const NavBar = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector(getUserInfo);

  useEffect(() => {
    dispatch(loadSession());
  }, []);

  return (
    <>
      {
          userInfo.logged_in
          && (
          <div className="navbar">
            <Link to="/add_deal">
              <AddOutlinedIcon />
              <div>Add Deal</div>
            </Link>
            <Link to="/track">
              <TrendingUpOutlinedIcon />
              <div>Track</div>
            </Link>
            <Link to="/progress">
              <TrackChangesOutlinedIcon />
              <div>Progress</div>
            </Link>
            <Link to="/profile">
              <PersonOutlinedIcon />
              <div>Profile</div>
            </Link>
          </div>
          )
        }
    </>
  );
};

export default NavBar;
