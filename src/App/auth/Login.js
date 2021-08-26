import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../store/slicers/user_login';
import { getSessionInfo, loadSession } from '../../store/slicers/user_session';
import AppBar from '../components/AppBar';
import './style/auth.css';

const Login = () => {
  const dispatch = useDispatch();
  const sessionInfo = useSelector(getSessionInfo);
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

    if (!sessionInfo.logged_in) {
      document.querySelector('.auth-error').classList.remove('hide');
    }

    setNewUser({ ...newUser, password: '' });
  };

  // console.log('Login Screen: ', sessionInfo.logged_in);
  // console.log('Login Screen: ', loggedInStatus);
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
        <div className="auth-error hide">Credentials Not Found</div>
        <div className="auth-sub">
          <p>New User Registration form</p>
          <Link to="/registration">Sign Up</Link>
        </div>
      </div>
    </>
  );
};

export default Login;
