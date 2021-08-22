import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getLoggedInStatus, loginUser } from '../../store/slicers/user_login';

const Login = () => {
  const dispatch = useDispatch();
  const loggedInStatus = useSelector(getLoggedInStatus);
  const [newUser, setNewUser] = useState({ username: '', password: '' });

  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({
      user: {
        username: newUser.username,
        password: newUser.password,
      },
    }));
  };

  if (loggedInStatus) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <>
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder="Username" value={newUser.username} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" value={newUser.password} onChange={handleChange} required />
        <button type="submit">Login</button>
      </form>
      <br />
      <p>New User Registration form</p>
      <Link to="/registration">Sign Up</Link>
    </>
  );
};

export default Login;
