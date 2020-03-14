import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Routes from './components/routing/Routes';
import NavBar from './components/layout/NavBar';

import setAuthToken from './utils/setAuthToken';
import { loadUser } from './actions/auth';

import { Provider } from 'react-redux';
import store from './store';

import './App.css';

localStorage.token && setAuthToken(localStorage.token);

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <NavBar />
          <Switch>
            <Route component={Routes} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
