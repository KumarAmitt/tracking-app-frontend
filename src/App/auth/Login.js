import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => (
  <>
    <h2>Sign In</h2>
    <form>
      <input type="text" name="username" placeholder="Username" required />
      <input type="password" name="password" placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
    <br />
    <p>New User Registration form</p>
    <Link to="/registration">Sign Up</Link>
  </>
);

export default Login;
