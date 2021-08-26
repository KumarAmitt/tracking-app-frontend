import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getRegistrationStatus, registerUser } from '../../store/slicers/user_registration';
import AppBar from '../components/AppBar';

const Registration = () => {
  const dispatch = useDispatch();
  const registrationStatus = useSelector(getRegistrationStatus);

  const [newUser, setNewUser] = useState({ username: '', password: '', password_confirmation: '' });

  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser({
      user: {
        username: newUser.username,
        password: newUser.password,
        password_confirmation: newUser.password_confirmation,
      },
    }));
  };

  if (registrationStatus === true) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <>
      <AppBar title="Sign up" />
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder="Username" value={newUser.username} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" value={newUser.password} onChange={handleChange} required />
        <input type="password" name="password_confirmation" placeholder="Password Confirmation" value={newUser.password_confirmation} onChange={handleChange} required />
        <button type="submit">Register</button>
      </form>
      <br />
      <p>Existing users Login</p>
      <Link to="/">Sign In</Link>
    </>
  );
};

export default Registration;
