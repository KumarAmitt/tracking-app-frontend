import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../store/slicers/user_login';
import { getSessionInfo, loadSession } from '../../store/slicers/user_session';

const Login = () => {
  const dispatch = useDispatch();
  const sessionInfo = useSelector(getSessionInfo);
  const [newUser, setNewUser] = useState({ username: '', password: '' });

  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
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
      console.log('confirm credentials');
      const el = document.getElementById('form');
      el.insertAdjacentHTML('beforeend', '<div style="color: red">Credentials Not Found</div>');
    }
  };

  console.log('Login Screen: ', sessionInfo.logged_in);
  // console.log('Login Screen: ', loggedInStatus);
  if (sessionInfo.logged_in) {
    return <Redirect to="/profile" />;
  }

  return (
    <>
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit} id="form">
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
