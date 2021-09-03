import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LinearProgress from '@material-ui/core/LinearProgress';
import {
  getLoginInfo, getLoginProgress, loginUser,
} from '../../../store/slicers/userLogin';
import AppBar from '../AppBar/AppBar';
import './style/auth.css';

const Login = () => {
  const dispatch = useDispatch();
  const loginProgress = useSelector(getLoginProgress);

  const loginInfo = useSelector(getLoginInfo);
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

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   await dispatch(loginUser({
  //     user: {
  //       username,
  //       password,
  //     },
  //   }));
  //   dispatch(loadSession());
  //
  //   if (!loggedInStatus) {
  //     document.querySelector('.auth-error').classList.remove('hide');
  //   }
  //
  //   setNewUser({ ...newUser, password: '' });
  // };
  //
  // if (sessionInfo.logged_in) {
  //   return <Redirect to="/profile" />;
  // }

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

  console.log(loginInfo);

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
