import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Auth from './auth/Auth';
import Dashboard from './components/Dashboard';
import AppBar from './components/AppBar';
import AppBarBottom from './components/AppBarBottom';

function App() {
  return (
    <>
      <AppBar />
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Auth} />
          <Route exact path="/dashboard" component={Dashboard} />
        </Switch>
        <AppBarBottom />
      </BrowserRouter>
    </>
  );
}

export default App;
