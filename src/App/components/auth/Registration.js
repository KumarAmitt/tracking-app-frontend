import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LinearProgress from '@material-ui/core/LinearProgress';
import AppBar from '../AppBar/AppBar';
import './style/auth.css';
import { getUserInfo, getUserLoadingStatus, registerUser } from '../../../store/slicers/user';

const Registration = () => {
  const dispatch = useDispatch();

  const userInfo = useSelector(getUserInfo);
  const userLoading = useSelector(getUserLoadingStatus);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const resetForm = () => {
    setUsername('');
    setPassword('');
    setConfirmPassword('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(registerUser({
      user: {
        username,
        password,
        password_confirmation: confirmPassword,
      },
    }));
    resetForm();
  };

  if (userInfo.logged_in) {
    return <Redirect to="/profile" />;
  }

  return (
    <>
      <AppBar title="Sign up" link="/" />
      <div className="auth">
        <div className="auth-sub">
          <p>Already have an account?</p>
          <Link to="/">Sign In</Link>
        </div>
        <form onSubmit={handleSubmit} id="form">
          <input type="text" placeholder="Username (4-8 character)" value={username} onChange={(e) => setUsername(e.target.value)} required />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <input type="password" placeholder="Password Confirmation" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
          <button type="submit">Register</button>
        </form>
        {
          userLoading && <LinearProgress className="progress-bar" />
         }
      </div>
    </>
  );
};

export default Registration;
