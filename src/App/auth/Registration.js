import React from 'react';
import { Link } from 'react-router-dom';

const Registration = () => (
  <>
    <form>
      <input type="text" name="username" placeholder="Username" required />
      <input type="password" name="password" placeholder="Password" required />
      <input type="password" name="password_confirmation" placeholder="Password Confirmation" required />
      <button type="submit">Register</button>
    </form>
    <br />
    <p>Existing users Login</p>
    <Link to="/">Sign In</Link>
  </>
);

export default Registration;
