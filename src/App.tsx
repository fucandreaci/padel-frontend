import React from 'react';
import {Route, Router, Switch} from 'react-router-dom';
import customHistory from './navigation/customHistory.config';

function App() {
  return (
      <Router history={customHistory}>
        <Switch>
          <Route path="/login" exact={true}>
          </Route>
          <Route path="/home" exact={true}>
          </Route>
        </Switch>
      </Router>
  );
}

export default App;
