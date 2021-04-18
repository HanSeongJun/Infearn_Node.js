import React from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import LandingPage from './components/view/LandingPage/LandingPage'
import LoginPage from './components/view/LoginPage/LoginPage'
import RegisterPage from './components/view/RegisterPage/RegisterPage'
import Auth from './hoc/auth'

function App() {
  return (
    <Router>
      <div>
        {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
        <Switch>
          <Route exact path="/" component={Auth(LandingPage, null, true)} />
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, true)} />
        </Switch>
      </div>
    </Router>
  );
}

export default App