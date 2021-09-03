import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LinearProgress from '@material-ui/core/LinearProgress';
import { getRegistrationInfo, getRegistrationProgress, registerUser } from '../../../store/slicers/userRegistration';
import AppBar from '../AppBar/AppBar';
import './style/auth.css';

const Registration = () => {
  const dispatch = useDispatch();
  const regInfo = useSelector(getRegistrationInfo);
  const registrationProgress = useSelector(getRegistrationProgress);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const changeUsername = (e) => {
    setUsername(e.target.value);
  };

  const changePassword = (e) => {
    setPassword(e.target.value);
  };

  const changeConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  const resetForm = () => {
    setUsername('');
    setPassword('');
    setConfirmPassword('');
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   await dispatch(registerUser({
  //     user: {
  //       username: newUser.username,
  //       password: newUser.password,
  //       password_confirmation: newUser.password_confirmation,
  //     },
  //   }));
  //   // dispatch(loadSession());
  //
  //   if (!registrationStatus) {
  //     document.querySelector('.auth-error').classList.remove('hide');
  //   }
  //
  //   setNewUser({ ...newUser, password: '', password_confirmation: '' });
  // };

  // if (sessionInfo.logged_in) {e
  //   return <Redirect to="profile" />;
  // }

  const handleSubmit = async (e) => {
    e.preventDefault();

    await dispatch(registerUser({
      user: {
        username,
        password,
        password_confirmation: confirmPassword,
      },
    }));
    resetForm();
  };

  console.log(regInfo.status);
  if (regInfo.state === 500) {
    console.log('Registration unsuccess');
  } else {
    console.log('Registered User: ', regInfo.username);
  }

  return (
    <>
      <AppBar title="Sign up" link="/" />
      <div className="auth">
        <form onSubmit={handleSubmit} id="form">
          <input type="text" placeholder="Username (4-8 character)" value={username} onChange={changeUsername} required />
          <input type="password" placeholder="Password" value={password} onChange={changePassword} required />
          <input type="password" placeholder="Password Confirmation" value={confirmPassword} onChange={changeConfirmPassword} required />
          <button type="submit">Register</button>
        </form>
        {
          registrationProgress && <LinearProgress className="progress-bar" />
        }
        <div className="auth-error hide">Registration Failed</div>
        <div className="auth-sub">
          <p>Existing users Login</p>
          <Link to="/">Sign In</Link>
        </div>
      </div>
    </>
  );
};

export default Registration;
