import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import NavBar from './components/NavBar';
import Registration from './auth/Registration';
import Login from './auth/Login';
import Profile from './components/Profile';
import AddDeal from './components/AddDeal';
import Track from './components/Track';
import Progress from './components/Progress';
import TrackDetails from './components/TrackDetails';

function App() {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/registration" component={Registration} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/add_deal" component={AddDeal} />
          <Route exact path="/track" component={Track} />
          <Route exact path="/track_details" component={TrackDetails} />
          <Route exact path="/progress" component={Progress} />
        </Switch>
        <hr />
        <NavBar />
      </BrowserRouter>
    </>
  );
}

export default App;
