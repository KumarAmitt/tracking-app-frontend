import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './auth/Home';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/dashboard" component={Dashboard} />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
