import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import Registration from './components/auth/Registration';
import Login from './components/auth/Login';
import Profile from './components/Profile/Profile';
import AddDeal from './components/AddDeal/AddDeal';
import Track from './components/Track/Track';
import Progress from './components/Progress/Progress';
import TrackDetails from './components/Track/TrackDetails';

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
        <NavBar />
      </BrowserRouter>
    </>
  );
}

export default App;
