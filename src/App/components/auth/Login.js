import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LinearProgress from '@material-ui/core/LinearProgress';
import AppBar from '../AppBar/AppBar';
import './style/auth.css';
import { getUserInfo, getUserLoadingStatus, loginUser } from '../../../store/slicers/user';

const Login = () => {
  const dispatch = useDispatch();

  const userInfo = useSelector(getUserInfo);
  const userLoading = useSelector(getUserLoadingStatus);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const changeUsername = (e) => {
    setUsername(e.target.value);
  };

  const changePassword = (e) => {
    setPassword(e.target.value);
  };

  const resetForm = () => {
    setUsername('');
    setPassword('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({
      user: {
        username,
        password,
      },
    }));
    resetForm();
  };

  if (userInfo.logged_in) {
    return <Redirect to="/profile" />;
  }

  return (
    <>
      <AppBar title="Sign In" link="/registration" />
      <div className="auth">
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Username" value={username} onChange={changeUsername} required />
          <input type="password" placeholder="Password" value={password} onChange={changePassword} required />
          <button type="submit">Login</button>
        </form>
        {
          userLoading && <LinearProgress className="progress-bar" />
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
