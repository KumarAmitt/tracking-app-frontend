import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../store/slicers/user_registration';
import AppBar from '../components/AppBar';
import { getSessionInfo, loadSession } from '../../store/slicers/user_session';
import './style/auth.css';

const Registration = () => {
  const dispatch = useDispatch();
  const sessionInfo = useSelector(getSessionInfo);

  const [newUser, setNewUser] = useState({ username: '', password: '', password_confirmation: '' });

  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
    document.querySelector('.auth-error').classList.add('hide');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(registerUser({
      user: {
        username: newUser.username,
        password: newUser.password,
        password_confirmation: newUser.password_confirmation,
      },
    }));
    dispatch(loadSession());

    if (!sessionInfo.logged_in) {
      document.querySelector('.auth-error').classList.remove('hide');
    }

    setNewUser({ ...newUser, password: '', password_confirmation: '' });
  };

  // console.log('registration: ', registrationStatus);
  // console.log(sessionInfo.logged_in);

  if (sessionInfo.logged_in) {
    return <Redirect to="profile" />;
  }

  return (
    <>
      <AppBar title="Sign up" link="/" />
      <div className="auth">
        <form onSubmit={handleSubmit} id="form">
          <input type="text" name="username" placeholder="Username (4-8 character)" value={newUser.username} onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" value={newUser.password} onChange={handleChange} required />
          <input type="password" name="password_confirmation" placeholder="Password Confirmation" value={newUser.password_confirmation} onChange={handleChange} required />
          <button type="submit">Register</button>
        </form>
        <div className="auth-error hide">Credentials Not Found</div>
        <div className="auth-sub">
          <p>Existing users Login</p>
          <Link to="/">Sign In</Link>
        </div>
      </div>
    </>
  );
};

export default Registration;
