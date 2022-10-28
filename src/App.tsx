import React from 'react';
import {Route, Router, Switch} from 'react-router-dom';
import customHistory from './navigation/customHistory.config';
import {Login} from './screens/login/login.component';
import {Signup} from './screens/signup/signup.component';
import {Home} from './screens/home/home.component';
import {HomeAdmin} from './screens/admin/components/homeAdmin/homeAdmin.component';

function App() {
  return (
      <Router history={customHistory}>
        <Switch>
          <Route path="/login" exact={true}>
              <Login />
          </Route>
          <Route path="/signup" exact={true}>
              <Signup />
          </Route>
          <Route path="/home" exact={true}>
              <Home />
          </Route>
          <Route path="/admin/home" exact={true}>
              <HomeAdmin />
          </Route>
        </Switch>
      </Router>
  );
}

export default App;
