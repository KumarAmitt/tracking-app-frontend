import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LinearProgress from '@material-ui/core/LinearProgress';
import { getLoggedInStatus, getLoginProgress, loginUser } from '../../store/slicers/user_login';
import { getSessionInfo, loadSession } from '../../store/slicers/user_session';
import AppBar from '../components/AppBar';
import './style/auth.css';

const Login = () => {
  const dispatch = useDispatch();
  const sessionInfo = useSelector(getSessionInfo);
  const loggedInStatus = useSelector(getLoggedInStatus);
  const loginProgress = useSelector(getLoginProgress);
  const [newUser, setNewUser] = useState({ username: '', password: '' });

  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
    document.querySelector('.auth-error').classList.add('hide');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(loginUser({
      user: {
        username: newUser.username,
        password: newUser.password,
      },
    }));
    dispatch(loadSession());

    if (!loggedInStatus) {
      document.querySelector('.auth-error').classList.remove('hide');
    }

    setNewUser({ ...newUser, password: '' });
  };

  if (sessionInfo.logged_in) {
    return <Redirect to="/profile" />;
  }

  return (
    <>
      <AppBar title="Sign In" link="/registration" />
      <div className="auth">
        <form onSubmit={handleSubmit}>
          <input type="text" name="username" placeholder="Username" value={newUser.username} onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" value={newUser.password} onChange={handleChange} required />
          <button type="submit">Login</button>
        </form>
        {
          loginProgress && <LinearProgress className="progress-bar" />
        }
        <div className="auth-error hide">Credentials Not Available</div>
        <div className="auth-sub">
          <p>New User Registration form</p>
          <Link to="/registration">Sign Up</Link>
        </div>
      </div>
    </>
  );
};

export default Login;
