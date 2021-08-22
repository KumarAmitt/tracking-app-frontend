import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import AppBar from './components/AppBar';
import NavBar from './components/NavBar';
import Registration from './auth/Registration';
import Login from './auth/Login';
import Profile from './components/Profile';

function App() {
  return (
    <>
      <AppBar />
      <hr />
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/registration" component={Registration} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/profile" component={Profile} />
        </Switch>
        <hr />
        <NavBar />
      </BrowserRouter>
    </>
  );
}

export default App;
