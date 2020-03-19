import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';

import PrivateRoute from '../routing/PrivateRoute';
import Alert from '../layout/Alert';
import Login from '../auth/Login';
import Register from '../auth/Register';
import ProfileSeriesAdd from '../profile/ProfileSeriesAdd';

const Routes = () => {
  return (
    <Fragment>
      <Alert />
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <PrivateRoute exact path="/series/add" component={ProfileSeriesAdd} />
      </Switch>
    </Fragment>
  );
};

export default Routes;
